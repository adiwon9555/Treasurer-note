import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import UpcomingEvents from './../components/Events/UpcomingEvents';
import PassedEvents from './../components/Events/PassedEvents';

const EventsTopNavigator = createMaterialTopTabNavigator({
  UpcomingEvents: {
    screen: UpcomingEvents,
  },
  PassedEvents: {
    screen: PassedEvents,
  },
});

export default EventsTopNavigator;
