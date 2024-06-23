import {Table, TableColumnsType, TableProps} from "antd";
import {useState} from "react";
import {ObjectRoomStatus} from "../../../conponents/ObjectStatus/ObjectStatus.tsx";
import {GetRandomIntInclusive, GetRoomStatusFake} from "../../../utils/fake.ts";
import * as React from "react";

type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface DataType {
    key: React.Key;
    roomNumber: number;
    bedsQuantity: number;
    wcsQuantity: number;
    maximumPeople: number,
    price: Number
    status: React.ReactElement,
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'Số phòng',
        dataIndex: "roomNumber",
        align: "center",
        width: "100px"
    },
    {
        title: 'Số lượng gường ngủ',
        dataIndex: "bedsQuantity",
        align: "center",
        width: "150px"
    },
    {
        title: 'Số lượng WC',
        dataIndex: "wcsQuantity",
        align: "center",
        width: "150px"
    },
    {
        title: "Số người tối đa",
        dataIndex: "maximumPeople",
        align: "center",
        width: "150px"
    },
    {
        title: "Giá",
        dataIndex: "price",
        align: "center",
        width: "100px"
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        align: "center",
        width: "110px"
    }
];

const data: DataType[] = [];
for (let i = 0; i < 30; i++) {
    data.push({
        key: i,
        roomNumber: i,
        bedsQuantity: GetRandomIntInclusive(1, 3),
        wcsQuantity: GetRandomIntInclusive(1, 3),
        maximumPeople: GetRandomIntInclusive(1, 10),
        price: GetRandomIntInclusive(100, 2000),
        status: <ObjectRoomStatus status={GetRoomStatusFake()} />
    });
}

export const RoomManagement = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
            {
                key: 'even',
                text: 'Select Even Row',
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
        ],
    };

    return (
        <Table
            bordered
            size={"large"}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
        />
    );
}