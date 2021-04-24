import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'
interface BalanceTranser {
    balance: string,
    currencySign: string,
}

export default function BalanceTransferComponent(props: BalanceTranser) {
    return (
        <View
            style={{
                flexDirection: 'row',
                height: 80,
                borderBottomColor: 'lightgray',
                borderBottomWidth: 0.5,
                justifyContent: 'space-between',
                backgroundColor: 'white',

            }}>

            <View style={{ flexDirection: 'column', justifyContent: 'center', marginLeft: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', alignSelf: 'center' }}>{props.currencySign}{props.balance}</Text>
                <Text style={{ alignSelf: 'center', fontSize: 12 }}>Total Balance</Text>
            </View>
            <Button
                containerStyle={{ alignSelf: 'center', marginRight: 16 }}
                title="Transfer" type="outline" />

        </View>
    )
}
