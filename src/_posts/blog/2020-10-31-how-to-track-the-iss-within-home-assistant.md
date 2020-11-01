---
layout: post
title: How to Track the ISS within Home Assistant
description: Follow the International Space Station overhead
tags: ["hassio", "guides"]
cover: cover.jpg
cover-credit: <span>Photo by <a href="https://unsplash.com/@norbertkowalczyk?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Norbert Kowalczyk</a> on <a href="https://unsplash.com/s/photos/international-space-station?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
---

## Introduction

In this post I will be running through the process of tracking the International Space Station from within Home Assistant using a mixture of REST APIs, MQTT and the Map Card Lovelace component :satellite:

>There does already exist an [ISS integration](https://www.home-assistant.io/integrations/iss/) for Home Assistant however I don't believe it has been updated for a while, I might have a play with it in the future to update the APIs used to fetch the data especially for use with the Map. 
>
>I've seen a few others struggling to get this to work as expected, when you add the `show_on_map` property it returns an error asking for an API key, therefore the solution below is to use pure REST APIs which can be easily modified in the future as well as adding the additional functionality of including further sensors to track specific data from the ISS.

- toc
{: toc }

## Getting Started

### Prerequisites

- A currently running instance of [Home Assistant](https://www.home-assistant.io/)
- An Internet connection

### What are we going to be using?

So, before we dive in, I've listed below the integrations we're going to be using, further on in this guide I'll be describing what each one does for us as we go along with a few code snippets :+1:

- [Sensors (REST, Template Platforms)](https://www.home-assistant.io/integrations/sensor/)
- [Device Trackers (MQTT JSON)](https://www.home-assistant.io/integrations/mqtt_json/)
- [Automations](https://www.home-assistant.io/docs/automation/)

## YAML Configuration

Firstly, we're going to get started by writing up the YAML configuration used to track the ISS (or any other satellite/GPS entities with a REST API).

On an *off-the-shelf* style installation of Home Assistant this will involve the `configuration.yaml` file however, depending on your particular directory setup, you'll need to decide where you want to put these configuration snippets to match your needs.

### Sensors

To be able to track the ISS we're going to need to create three core sensors which extract data from the REST API we're consuming, these include:

- [ISS Coordinates](#iss-coordinates)
  - Current location of the International Space Station using latitude and longitude along with the timestamp
- [ISS Pass Times](#iss-pass-times)
  - List of the next five pass times over your location
- [ISS Crew](#iss-crew)
  - Names and number of the current people on the International Space Station

These will all exist inside the `sensor:` integration and a full example can be seen at the end of this section.

#### ISS Coordinates

The first sensor we're going to create will be used to consume the timestamp, latitude and longitude values of the ISS. We'll be hitting this endpoint every 15 seconds however feel free to adjust this to get more/less accurate data.

```yaml
- platform: rest
  name: ISS Coordinates
  json_attributes:
    - timestamp
    - iss_position
    - latitude
    - longitude
  resource: 'http://api.open-notify.org/iss-now.json'
  scan_interval:
    seconds: 15
```

#### ISS Pass Times

The next sensor we're going to create is one that tracks fly over pass times of the station, it takes latitude and longitude query string parameters and returns the next five pass times.

Make sure to change the `xx.xxxx` values with your latitude and longitude.
{: .message }

```yaml
- platform: rest
  name: ISS Pass times
  json_attributes:
    - request
    - response
  value_template: >
    {{ "{{ value_json.message " }}}}
  # Change the line below to your latitude and longitude
  resource: 'http://api.open-notify.org/iss-pass.json?lat=xx.xxxx&lon=xx.xxxx'
  scan_interval:
    seconds: 300
```

If you wish to hide your location, you can wrap the resource property in a secret and replace the resource line with:

```yaml
resource: !secret iss_pass_times_url
```

And then in your `secrets.yaml` file:

```yaml
iss_pass_times_url: 'http://api.open-notify.org/iss-pass.json?lat=51.5007&lon=0.1246'
```

#### ISS Crew

This sensor records the number of people on the ISS as well as their names, this is used on my setup as a little extra information on the dashboard, it's not necessary for the other two sensors :slightly_smiling_face:

```yaml
- platform: rest
  name: ISS Crew
  json_attributes:
    - people
    - number
  value_template: "{{ "{{ value_json['number'] "}}}}"
  resource: 'http://api.open-notify.org/astros.json'
```

Below is the full YAML configuration for the Sensor integration, be sure to change your latitude and longitude in the `ISS Pass times` sensor to get accurate readings!

{% raw %}

```yaml
  sensor:
  - platform: rest
    name: ISS Coordinates
    json_attributes:
      - timestamp
      - iss_position
      - latitude
      - longitude
    resource: 'http://api.open-notify.org/iss-now.json'
    scan_interval:
      seconds: 15

  - platform: rest
    name: ISS Pass times
    json_attributes:
      - request
      - response
    value_template: >
      {{ value_json.message }}
    resource: 'http://api.open-notify.org/iss-pass.json?lat=51.5007&lon=0.1246'
    scan_interval:
      seconds: 300

  - platform: rest
    name: ISS Crew
    json_attributes:
      - people
      - number
    value_template: "{{ value_json['number'] }}"
    resource: 'http://api.open-notify.org/astros.json'
```

{% endraw %}

### Automations

#### ISS Location Update

Now we're going to create an [Automation](https://www.home-assistant.io/docs/automation/) that will publish the data from the `iss_coordinates` sensor we created previously for Home Assistant to use. This will be triggered whenever the state of the sensor changes (i.e. when it receives new coordinates).

We're going to be publishing the data using a [MQTT topic](https://www.home-assistant.io/docs/mqtt/service/) entitled `location/iss`

```yaml
- alias: 'ISS Location Update'
  trigger:
    - platform: state
      entity_id: sensor.iss_coordinates
  action:
    service: mqtt.publish
    data_template:
      topic: location/iss
      payload_template: '{"longitude": "{{ "{{ states.sensor.iss_coordinates.attributes.iss_position.longitude | float "}}}}","latitude": "{{ "{{ states.sensor.iss_coordinates.attributes.iss_position.latitude | float "}}}}"}'
      retain: true
```

### Device Tracker

Finally, the last step in our YAML configuration is to add the [Device Tracker](https://www.home-assistant.io/integrations/device_tracker) integration and use the [MQTT JSON](https://www.home-assistant.io/integrations/mqtt_json) platform to retrieve the published data from the `location/iss` topic we created in the previous section.

```yaml
device_tracker:
  - platform: mqtt_json
    devices:
      iss: location/iss
```

This should now let you see the ISS from within Home Assistant on the default Map as it is a tracked entity.

## Lovelace

Once you've saved the configuration and restarted Home Assistant, you can now get started with creating new card(s) to display the data.

### Map Card

To show the ISS on a Map card you can use the below YAML (or use the UI to select the `device_tracker.iss` entity).

```yaml
- type: map
    entities:
      - entity: device_tracker.iss
    dark_mode: true
    aspect_ratio: '16:9'
    default_zoom: 1.5
    hours_to_show: 2
```

This should produce a map similar to the one below:

![Map Card](/assets/images{{ page.url }}map.png)

To get an image of the ISS to show rather, than the ISS label text, you can obtain a small image of the satellite and place it within the `/config/www/` directory.

Once you've got your icon ready you can then use the UI to add the image by adding the attribute `entity_picture` with the value of `"/local/<image path>"` under Configuration > Customizations as seen below:

![Customization](/assets/images{{ page.url }}customization.png)

### Final Results

Below shows how I've currently decided to show the ISS on my Home Assistant instance, it makes use of the custom `vertical-stack-in-card` lovelace card which you can install from the Home Assistant Community Store - [HACS](https://hacs.xyz/).

![Final Card](/assets/images{{ page.url }}card.png)

See below for the YAML I've used to create it:

```yaml
type: 'custom:vertical-stack-in-card'
cards:
  - type: entities
    title: International Space Station
    icon: 'mdi:space-station'
    entities:
      - type: 'custom:bar-card'
  - type: map
    entities:
      - entity: device_tracker.iss
    dark_mode: true
    aspect_ratio: '16:9'
    default_zoom: 1.5
    hours_to_show: 2
  - type: entity
    entity: sensor.iss_risetime_0
    name: Next Risetime
  - type: entities
    entities:
      - entity: sensor.iss_risetime_1
        name: 2nd Risetime
        icon: 'mdi:clock-out'
      - entity: sensor.iss_risetime_2
        name: 3rd Risetime
        icon: 'mdi:clock-out'
      - entity: sensor.iss_risetime_3
        name: 4th Risetime
        icon: 'mdi:clock-out'
      - entity: sensor.iss_risetime_4
        name: 5th Risetime
        icon: 'mdi:clock-out'
  - type: entity
    entity: sensor.iss_crew
    name: Current Crew
    icon: 'mdi:account-group'
    unit: People
```

#### Additional Pass Time Sensors

In my example card above I've created a few additional sensors which can be used to easily pull out the next five rise times and durations using the [Template](https://www.home-assistant.io/integrations/template/) platform as seen below:

{% raw %}

```yaml
- platform: template
  sensors:
    iss_risetime_0:
      value_template: '{% if states.sensor.iss_pass_times %}{{ states.sensor.iss_pass_times.attributes["response"][0]["risetime"] | timestamp_custom("%a %d %b %Y %H:%M:%S") }}{% endif %}'
      friendly_name: ISS Risetime Next
    iss_duration_0:
      value_template: '{% if states.sensor.iss_pass_times %}{{ states.sensor.iss_pass_times.attributes["response"][0]["duration"] }}{% endif %}'
      friendly_name: ISS Duration Next
    iss_risetime_1:
      value_template: '{% if states.sensor.iss_pass_times %}{{ states.sensor.iss_pass_times.attributes["response"][1]["risetime"] | timestamp_custom("%a %d %b %Y %H:%M:%S") }}{% endif %}'
      friendly_name: ISS Risetime 2nd
    iss_duration_1:
      value_template: '{% if states.sensor.iss_pass_times %}{{ states.sensor.iss_pass_times.attributes["response"][1]["duration"] }}{% endif %}'
      friendly_name: ISS Duration 2nd
    iss_risetime_2:
      value_template: '{% if states.sensor.iss_pass_times %}{{ states.sensor.iss_pass_times.attributes["response"][2]["risetime"] | timestamp_custom("%a %d %b %Y %H:%M:%S") }}{% endif %}'
      friendly_name: ISS Risetime 3rd
    iss_duration_2:
      value_template: '{% if states.sensor.iss_pass_times %}{{ states.sensor.iss_pass_times.attributes["response"][2]["duration"] }}{% endif %}'
      friendly_name: ISS Duration 3rd
    iss_risetime_3:
      value_template: '{% if states.sensor.iss_pass_times %}{{ states.sensor.iss_pass_times.attributes["response"][3]["risetime"] | timestamp_custom("%a %d %b %Y %H:%M:%S") }}{% endif %}'
      friendly_name: ISS Risetime 4th
    iss_duration_3:
      value_template: '{% if states.sensor.iss_pass_times %}{{ states.sensor.iss_pass_times.attributes["response"][3]["duration"] }}{% endif %}'
      friendly_name: ISS Duration 4th
    iss_risetime_4:
      value_template: '{% if states.sensor.iss_pass_times %}{{ states.sensor.iss_pass_times.attributes["response"][4]["risetime"] | timestamp_custom("%a %d %b %Y %H:%M:%S") }}{% endif %}'
      friendly_name: ISS Risetime 5th
    iss_duration_4:
      value_template: '{% if states.sensor.iss_pass_times %}{{ states.sensor.iss_pass_times.attributes["response"][4]["duration"] }}{% endif %}'
      friendly_name: ISS Duration 5th
```

{% endraw %}

Hopefully this guide has helped you create a few new cards for tracking the ISS (or any other satellite out there)! :sunglasses:
