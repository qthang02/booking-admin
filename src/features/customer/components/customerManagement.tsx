import {Table, TableColumnsType, TableProps} from "antd";
import * as React from "react";
import {getRandomAddress, getRandomDate, getRandomEmail, getRandomName, getRandomPhoneNumber} from "../../../utils/fake.ts";
import {useState} from "react";

type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface DataType {
    key: React.Key;
    fullName: string;
    bod: string;
    email: string;
    phone: string,
    address: string,
    // status: React.ReactElement,
}

const columns: TableColumnsType<DataType> = [
    {
        title: "STT",
        align: "center",
        key: "stt",
        render: (_text, _record, index) => index + 1,
        width: "50px"
    },
    {
        title: 'Tên khách hàng',
        dataIndex: "fullName",
        align: "center",
        width: "100px"
    },
    {
        title: 'Ngày sinh',
        dataIndex: "bod",
        align: "center",
        width: "100px"
    },
    {
        title: "Email",
        dataIndex: "email",
        align: "center",
        width: "100px"
    },
    {
        title: "Số dđiện thoại",
        dataIndex: "phone",
        align: "center",
        width: "100px"
    },
    {
        title: "Địa chỉ",
        dataIndex: "address",
        align: "center",
        width: "150px"
    }
];

const data: DataType[] = [];
for (let i = 0; i < 30; i++) {
    data.push({
        key: i,
        address: getRandomAddress(),
        bod: getRandomDate().toDateString(),
        email: getRandomEmail(),
        fullName: getRandomName(),
        phone: getRandomPhoneNumber(),
    });
}

export const CustomerManagement = () => {
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