import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import { Button, Card } from 'react-native-elements'
import EarningListComponent from '~/components/EarningListComponent'

import BalanceTransferComponent from '../components/BalanceTransferComponent'
const balanceData = {
    balance: '0.00',
    currencySign: '$',
}

const data = [
    {
        id: '1',
        title: 'Registered Nurse (RN, BSN)',
        day: 'Today',
        fromTime: '3:00pm',
        toTime: '4:00pm',
        destination: 'Seattle Medical Post Acute Care',
        amount: '$360',
        status: 'pending'
    },
    {
        id: '2',
        title: 'Registered Nurse (RN, BSN)',
        day: 'Today',
        fromTime: '3:00pm',
        toTime: '4:00pm',
        destination: 'City Medical Complex',
        amount: '$360',
        status: 'pending'
    }
]

export default class HomeScreen extends Component {

    render() {
        return (
            <View style={{ flex: 1 }}>
                <BalanceTransferComponent {...balanceData} />

                <FlatList
                    data={data}
                    renderItem={({ item }) => <EarningListComponent key={item.id} {...item} />}
                />
            </View>
        )
    }
}
