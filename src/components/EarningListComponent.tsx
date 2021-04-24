import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Card } from 'react-native-elements'
interface EarningList {
    id: string,
    title: string,
    day: string,
    fromTime: string,
    toTime: string,
    destination: string,
    amount: string,
    status: string
}

export default function EarningListComponent(props: EarningList) {
    return (
        <Card containerStyle={{ borderRadius: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{props.title}</Text>
                <Text style={{ fontSize: 16, }}>{props.amount}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 6 }}>
                <Text style={{ fontSize: 14, }}>{props.day} {props.fromTime} {props.toTime}</Text>
                <Text style={{ fontSize: 14, color: 'lightgray' }}>{props.status}</Text>
            </View>
            <View>
                <Text style={{ fontSize: 14, color: 'lightgray' }}>{props.destination}</Text>
            </View>
        </Card>
    )
}
