import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._devices = [
            {
                id: 1,
                name: 'iPhone 12s+',
                price: 100000,
                typeId: 1,
                brandId: 2,
                rate: 5,
                img: "https://st.depositphotos.com/3228497/4236/v/600/depositphotos_42366715-stock-illustration-smart-phone-android-vector.jpg",
                info: [
                    {
                        id: 1,
                        title: "RAM",
                        description: "20 GB",
                    },
                    {
                        id: 2,
                        title: "Display",
                        description: "LED 12k",
                    },
                ],
            },
            {
                id: 2,
                name: 'Samsung galaxy X mini',
                price: 50000,
                typeId: 1,
                brandId: 1,
                rate: 4,
                img: "https://st.depositphotos.com/3228497/4236/v/600/depositphotos_42366715-stock-illustration-smart-phone-android-vector.jpg",
                info: [
                    {
                        id: 3,
                        title: "RAM",
                        description: "8 GB",
                    },
                    {
                        id: 4,
                        title: "Display",
                        description: "LED 8k",
                    }]
            },
            {
                id: 3,
                name: 'Samsung fridge',
                price: 20000,
                typeId: 2,
                brandId: 1,
                rate: 5,
                img: "https://st.depositphotos.com/3228497/4236/v/600/depositphotos_42366715-stock-illustration-smart-phone-android-vector.jpg",
                info: [
                    {
                        id: 5,
                        title: "RAM",
                        description: "4 GB",
                    },
                    {
                        id: 6,
                        title: "Display",
                        description: "LED 4k",
                    }
                ]},

        ]
        makeAutoObservable(this)
    }

    setDevices(array) {
        this._devices = array
    }


    get devices() {
        return this._devices
    }

}