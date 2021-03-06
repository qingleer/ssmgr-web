import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {Dialog_Delete} from '../Dialog/';
import TimeAgoLabel from './TimeAgoLabel';
import Ping from '../Ping';


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
});

class NodeList extends React.Component {
    constructor() {
        super();
    }


    componentWillReceiveProps(nextProps) {
      window.$('.js-basic-example').DataTable().destroy();
    }

    componentWillMount() {
    }

    componentDidUpdate() {
        window.$('.js-basic-example').DataTable({
            responsive: true,
            language: {
                "sProcessing":   "处理中...",
                "sLengthMenu":   "显示 _MENU_ 项结果",
                "sZeroRecords":  "没有匹配结果",
                "sInfo":         "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                "sInfoEmpty":    "显示第 0 至 0 项结果，共 0 项",
                "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                "sInfoPostFix":  "",
                "sSearch":       "搜索:",
                "sUrl":          "",
                "sEmptyTable":     "表中数据为空",
                "sLoadingRecords": "载入中...",
                "sInfoThousands":  ",",
                "oPaginate": {
                    "sFirst":    "首页",
                    "sPrevious": "上页",
                    "sNext":     "下页",
                    "sLast":     "末页"
                },
                "oAria": {
                    "sSortAscending":  ": 以升序排列此列",
                    "sSortDescending": ": 以降序排列此列"
                }
            }
        });


    }


    componentDidMount() {

    }

    componentWillUnmount() {
    }

    render() {
        let nodes;

        if (this.props.nodes) {
            console.log('props.nodes ' + this.props.nodes);

            nodes = this.props.nodes.map(node => {
                return <tr>
                    <td>{node.id}</td>
                    <td>
                        <Link to={`@${node.id}/users`} >
                          {node.node_name}
                        </Link>
                    </td>
                    <td>{node.node_ip}</td>
                    <td>{node.node_port}</td>
                    <td>{node.node_key}</td>
                    <td>{node.node_encry_mode}</td>
                    {/*<td>{`${node.user_count}/${node.max_user}`}</td>*/}
                    <td>
                        <div className="progress">
                            <div className="progress-bar  bg-cyan progress-bar-striped active" role="progressbar" aria-valuenow={node.user_count} aria-valuemin="0" aria-valuemax={node.max_user} style={{width: `${node.user_count / node.max_user * 100}%`}}>
                                <label className="col-black  align-center">{`${node.user_count}/${node.max_user}`}</label>
                                {/*<label className="col-black  align-center">{`${node.user_count}/${node.max_user}`}</label>*/}
                            </div>
                        </div>
                    </td>
                    <td><Ping url={'http://'+node.node_ip+':'+node.node_port+'/api/ping'}/> </td>
                    <td>
                        <TimeAgoLabel time={node.last_heartbeat}/>
                    </td>
                    <td>
                        <div className="btn-group ">
                            <button type="button" className="btn btn-primary btn-xs" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="material-icons">settings</i>
                                <span style={{verticalAlign: 'text-bottom'}}>操作</span>
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link to={`/nodes/${node.id}`} >
                                        修改
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`@${node.id}/users`} >
                                        节点用户管理
                                    </Link>
                                </li>
                                <li role="separator" className="divider"></li>
                                <li>
                                    <Dialog_Delete title={`确认要删除节点: ${node.node_name} 吗？`} text=""  deleteHandler={()=>this.props.onDelNode(node)} />
                                </li>
                            </ul>
                        </div>

                    </td>
                </tr>
            });


        } else {
            nodes = null;
        }

        return (
            <div className="row clearfix">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="card">
                        <div className="header">
                            <h2>
                                节点管理
                            </h2>



                            <ul className="header-dropdown m-r--5">
                                <li className="dropdown">

                                    <Link to="/nodes/add" className="dropdown-toggle">
                                        <i className="material-icons" alt="添加节点">add</i>
                                    </Link>
                                    <a href="javascript:void(0);" className="dropdown-toggle" onClick={this.props.onRefresh}>
                                        <i className="material-icons"  alt="刷新">refresh</i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="body">
                            <table className="table table-bordered table-striped table-hover js-basic-example dataTable">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>节点</th>
                                    <th>IP</th>
                                    <th>端口</th>
                                    <th>通讯秘钥</th>
                                    <th>默认加密方法</th>
                                    <th>负载</th>
                                    <th>Ping</th>
                                    <th>最近通讯</th>
                                    <th>操作</th>
                                </tr>
                                </thead>
                                <tfoot>
                                <tr>
                                    <th>ID</th>
                                    <th>节点</th>
                                    <th>IP</th>
                                    <th>端口</th>
                                    <th>通讯秘钥</th>
                                    <th>默认加密方法</th>
                                    <th>负载</th>
                                    <th>Ping</th>
                                    <th>最近通讯</th>
                                    <th>操作</th>
                                </tr>
                                </tfoot>
                                <tbody>
                                    {nodes}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NodeList);
