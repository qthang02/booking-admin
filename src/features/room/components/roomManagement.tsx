import {Table, TableColumnsType, TableProps} from "antd";
import {useState} from "react";
import {ObjectRoomStatus} from "../../../conponents/ObjectStatus/ObjectStatus.tsx";

type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface DataType {
    key: React.Key;
    roomNumber: number;
    bedsQuantity: number;
    wcsQuantity: number;
    maximumPeople: number
    status: React.ReactElement
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'Số phòng',
        dataIndex: "roomNumber",
        align: "center"
    },
    {
        title: 'Số lượng gường ngủ',
        dataIndex: "bedsQuantity",
        align: "center"
    },
    {
        title: 'Số lượng WC',
        dataIndex: "wcsQuantity",
        align: "center"
    },
    {
        title: "Số người tối đa",
        dataIndex: "maximumPeople",
        align: "center"
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        align: "center"
    }
];

function getRandomIntInclusive(min: number, max: number): number {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

const data: DataType[] = [];
for (let i = 0; i < 30; i++) {
    data.push({
        key: i,
        roomNumber: i,
        bedsQuantity: getRandomIntInclusive(1, 3),
        wcsQuantity: getRandomIntInclusive(1, 3),
        maximumPeople: getRandomIntInclusive(1, 10),
        status: <ObjectRoomStatus status={"EMPTY"} />
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
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
        />
    );
}