import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native'
import Feather from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

import HomeScreen from "./HomeScreen";
import PlayerScreen from "./PlayerScreen";
import SearchScreen from "./SearchScreen";
import ShelfScreen from "./ShelfScreen";

function RootScreen() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarHideOnKeyboard: true,
            tabBarInactiveTintColor: 'gray',
            tabBarActiveTintColor: '#124076',
            tabBarLabelStyle: {
                fontSize: 10,
            },
            tabBarItemStyle: {padding: 4},
        }}>
            <Tab.Screen options={{
                title: 'Danh sách',
                tabBarIcon: ({color}) => {
                    return (
                        <Feather
                            type={'Feather'}
                            color={color}
                            name="home"
                            size={20}
                        />
                    );
                },
            }} name="Home" component={HomeScreen}/>
            <Tab.Screen options={{
                title: 'Nghe/Đọc sách',
                tabBarIcon: ({color}) => {
                    return (
                        <Feather
                            type={'Feather'}
                            color={color}
                            name="play-circle"
                            size={20}
                        />
                    );
                },
            }} name="Player" component={PlayerScreen}/>
            <Tab.Screen options={{
                title: 'Tìm kiếm',
                tabBarIcon: ({color}) => {
                    return (
                        <Feather
                            type={'Feather'}
                            color={color}
                            name="search"
                            size={20}
                        />
                    );
                },
            }} name="Search" component={SearchScreen}/>
            <Tab.Screen options={{
                title: 'Giá sách',
                tabBarIcon: ({color}) => {
                    return (
                        <Feather
                            type={'Feather'}
                            color={color}
                            name="bookmark"
                            size={20}
                        />
                    );
                },
            }} name="Shelf" component={ShelfScreen}/>
        </Tab.Navigator>
    );
}

export default RootScreen
