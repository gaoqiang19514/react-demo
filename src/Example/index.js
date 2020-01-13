import React, { Component } from "react";
import Table from "rc-table";

import "./style.css";

const columns = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: 100,
        fixed: "left"
    },
    {
        title: "Age",
        dataIndex: "age",
        key: "age",
        width: 100
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address",
        width: 500
    },
    {
        title: "Operations",
        dataIndex: "",
        key: "operations",
        render: () => <a href="#">Delete</a>
    }
];

const data = [
    {
        name: "Jack",
        age: 28,
        address: "some wheresome wheresome wheresome wheresome where",
        key: "1"
    },
    { name: "Rose", age: 36, address: "some where", key: "1" },
    { name: "Jack", age: 28, address: "some where", key: "2" },
    { name: "Rose", age: 36, address: "some where", key: "3" },
    { name: "Jack", age: 28, address: "some where", key: "4" },
    { name: "Rose", age: 36, address: "some where", key: "5" },
    { name: "Jack", age: 28, address: "some where", key: "6" },
    { name: "Rose", age: 36, address: "some where", key: "7" },
    { name: "Jack", age: 28, address: "some where", key: "8" },
    { name: "Rose", age: 36, address: "some where", key: "9" },
    { name: "Jack", age: 28, address: "some where", key: "10" },
    { name: "Rose", age: 36, address: "some where", key: "11" },
    { name: "Jack", age: 28, address: "some where", key: "12" },
    { name: "Rose", age: 36, address: "some where", key: "13" },
    { name: "Jack", age: 28, address: "some where", key: "14" },
    { name: "Rose", age: 36, address: "some where", key: "15" }
];

class Example extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        if (!this.mainRef) {
            return;
        }

        this.mainRef.addEventListener("scroll", e => {
            // 得到偏移量
            this.scrollHeaderLeft(this.mainRef.scrollLeft);
            this.scrollLeftTop(this.mainRef.scrollTop);
        });
    }

    scrollHeaderLeft(left) {
        if (!this.headerRef) {
            return;
        }

        this.headerRef.scrollLeft = left;
    }

    scrollLeftTop(top) {
        if (!this.leftRef) {
            return;
        }
        this.leftRef.scrollTop = top;
        console.log("scrollLeftTop", top);
    }

    render() {
        return (
            <div className="box">
                <div className="tableFixHead">
                    <table>
                        <thead>
                            <tr>
                                <th nowrap="nowrap">领导</th>
                                <th>星期一</th>
                                <th>星期二</th>
                                <th>星期三</th>
                                <th>星期四</th>
                                <th>星期五</th>
                                <th>星期六</th>
                                <th>星期日</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td  nowrap="nowrap">张谷华</td>
                                <td>
                                    <div>
                                        <div>上午</div>
                                        <div>调研市规划和自然资源局</div>
                                        <div>下午</div>
                                        <div>日常工作</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>上午</div>
                                        <div>调研市规划和自然资源局</div>
                                        <div>下午</div>
                                        <div>日常工作</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>上午</div>
                                        <div>调研市规划和自然资源局</div>
                                        <div>下午</div>
                                        <div>日常工作</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>上午</div>
                                        <div>调研市规划和自然资源局</div>
                                        <div>下午</div>
                                        <div>日常工作</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>上午</div>
                                        <div>调研市规划和自然资源局</div>
                                        <div>下午</div>
                                        <div>日常工作</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>上午</div>
                                        <div>调研市规划和自然资源局</div>
                                        <div>下午</div>
                                        <div>日常工作</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>上午</div>
                                        <div>调研市规划和自然资源局</div>
                                        <div>下午</div>
                                        <div>日常工作</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td  nowrap="nowrap">方发</td>
                                <td>
                                    <div>
                                        <div>上午</div>
                                        <div>调研市规划和自然资源局</div>
                                        <div>下午</div>
                                        <div>日常工作</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>上午</div>
                                        <div>调研市规划和自然资源局</div>
                                        <div>下午</div>
                                        <div>日常工作</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>上午</div>
                                        <div>调研市规划和自然资源局</div>
                                        <div>下午</div>
                                        <div>日常工作</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>上午</div>
                                        <div>调研市规划和自然资源局</div>
                                        <div>下午</div>
                                        <div>日常工作</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>上午</div>
                                        <div>调研市规划和自然资源局</div>
                                        <div>下午</div>
                                        <div>日常工作</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>上午</div>
                                        <div>调研市规划和自然资源局</div>
                                        <div>下午</div>
                                        <div>日常工作</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>上午</div>
                                        <div>调研市规划和自然资源局</div>
                                        <div>下午</div>
                                        <div>日常工作</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td  nowrap="nowrap">梁段</td>
                                <td>
                                    <div>
                                        <div>上午</div>
                                        <div>调研市规划和自然资源局</div>
                                        <div>下午</div>
                                        <div>日常工作</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>上午</div>
                                        <div>调研市规划和自然资源局</div>
                                        <div>下午</div>
                                        <div>日常工作</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>上午</div>
                                        <div>调研市规划和自然资源局</div>
                                        <div>下午</div>
                                        <div>日常工作</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>上午</div>
                                        <div>调研市规划和自然资源局</div>
                                        <div>下午</div>
                                        <div>日常工作</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>上午</div>
                                        <div>调研市规划和自然资源局</div>
                                        <div>下午</div>
                                        <div>日常工作</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>上午</div>
                                        <div>调研市规划和自然资源局</div>
                                        <div>下午</div>
                                        <div>日常工作</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>上午</div>
                                        <div>调研市规划和自然资源局</div>
                                        <div>下午</div>
                                        <div>日常工作</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td  nowrap="nowrap">陈少华</td>
                                <td>
                                    <div>
                                        <div>上午</div>
                                        <div>调研市规划和自然资源局</div>
                                        <div>下午</div>
                                        <div>日常工作</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>上午</div>
                                        <div>调研市规划和自然资源局</div>
                                        <div>下午</div>
                                        <div>日常工作</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>上午</div>
                                        <div>调研市规划和自然资源局</div>
                                        <div>下午</div>
                                        <div>日常工作</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>上午</div>
                                        <div>调研市规划和自然资源局</div>
                                        <div>下午</div>
                                        <div>日常工作</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>上午</div>
                                        <div>调研市规划和自然资源局</div>
                                        <div>下午</div>
                                        <div>日常工作</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>上午</div>
                                        <div>调研市规划和自然资源局</div>
                                        <div>下午</div>
                                        <div>日常工作</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>上午</div>
                                        <div>调研市规划和自然资源局</div>
                                        <div>下午</div>
                                        <div>日常工作</div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Example;
