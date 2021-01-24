﻿import React, { Component } from 'react';
import './Control2.css';
import { UsersTable } from './UsersTable';
import * as FiIcons from 'react-icons/fi';
import Sidebar from '../Sidebar';



export class ControlPanel2 extends Component {
    displayName = ControlPanel2.name;
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(sessionStorage.getItem('manager'))
    }
    logOut = (event) => {
        event.preventDefault();
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('login')
        sessionStorage.removeItem('name')
        sessionStorage.removeItem('password')
        sessionStorage.removeItem('surname')
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('admin')
        sessionStorage.removeItem('superAdmin')
        sessionStorage.removeItem('manager')
        sessionStorage.removeItem('magazineManagement')
        sessionStorage.removeItem('machineManagement')
        sessionStorage.removeItem('orderManagement')
        sessionStorage.removeItem('cutManagement')
        this.props.history.push('/')
    }

    homePage = (event) => {
        this.props.history.push('/home')
    }

    addUser = (event) => {
        this.props.history.push('/add_acount')
    }

    changePassword = (event) => {
        this.props.history.push('/change_password')
    }
    changeEmail = (event) => {
        this.props.history.push('/change_email')
    }

    userChanging = (event) => {
        this.props.history.push('/user_change')
    }

    tableRender() {
        if (sessionStorage.getItem('admin') === 'true' || sessionStorage.getItem('superAdmin') === 'true' || sessionStorage.getItem('manager') === 'true') {
            return (<UsersTable />);
        }
    }

    addAcouButton() {
        if (sessionStorage.getItem('admin') === 'true' || sessionStorage.getItem('superAdmin') === 'true' || sessionStorage.getItem('manager') === 'true') {
            return (<button className="success_add_user" onClick={this.addUser}>Dodaj Konto</button>);
        }
    }




    editMachine = (event) => {
        this.props.history.push('/cutmachineedit')
    }

    editGlassColor = (event) => {
        this.props.history.push('/glassatibutes')
    }

    userHistory = (event) => {
        this.props.history.push('/user_history')
    }

    typeMachineAdd() {
        if (sessionStorage.getItem('admin') === 'true' || sessionStorage.getItem('superAdmin') === 'true' || sessionStorage.getItem('manager') === 'true') {
            return (
                <button type="button" className="prim_type_machine" onClick={this.editMachine}>Typy maszyn</button>
            )
        }
    }
    colorAndTypeGlassEdit() {
        if (sessionStorage.getItem('admin') === 'true' || sessionStorage.getItem('superAdmin') === 'true' || sessionStorage.getItem('manager') === 'true') {
            return (
                <button type="button" className="prim_color_glass_edit" onClick={this.editGlassColor}>Zarządzanie szkłem</button>
            )
        }
    }

    usersHistoryTable() {
        if (sessionStorage.getItem('admin') === 'true' || sessionStorage.getItem('superAdmin') === 'true' || sessionStorage.getItem('manager') === 'true') {
            return (
                <button type="button" className="prim_all_user_history" onClick={this.userHistory}>Historia użytkowników</button>
            )
        }
    }
    adminPermissionsRender() {
        if (sessionStorage.getItem('admin') === 'true') {
            return (<option>Admin</option>)
        }
    }
    userPermissionsRender() {
        if (sessionStorage.getItem('user') === 'true') {
            return (<option>Pracownik</option>)
        }
    }
    superAdminPermissionsRender() {
        if (sessionStorage.getItem('superAdmin') === 'true') {
            return (<option>Super admin</option>)
        }
    }
    managerPermissionsRender() {
        if (sessionStorage.getItem('manager') === 'true') {
            return (<option>Menedżer</option>)
        }
    }
    magazineManagerPermissionsRender() {
        if (sessionStorage.getItem('magazineManagement') === 'true') {
            return (<option>Magazynier</option>)
        }
    }
    machineManagerPermissionsRender() {
        if (sessionStorage.getItem('machineManagement') === 'true') {
            return (<option>Menedżer maszyn</option>)
        }
    }
    orderManagerPermissionsRender() {
        if (sessionStorage.getItem('orderManagement') === 'true') {
            return (<option>Menedżer zleceń</option>)
        }
    }
    cutManagerPermissionsRender() {
        if (sessionStorage.getItem('cutManagement') === 'true') {
            return (<option>Menedżer cięcia</option>)
        }
    }



    render() {
        let buttonAdd = this.addAcouButton();
        let xd = this.tableRender();
        let typeMachine = this.typeMachineAdd();
        let admin = this.adminPermissionsRender();
        let user = this.userPermissionsRender();
        let superAdmin = this.superAdminPermissionsRender();
        let manager = this.managerPermissionsRender();
        let magazineManagement = this.magazineManagerPermissionsRender();
        let orderManagement = this.orderManagerPermissionsRender();
        let machineManagement = this.machineManagerPermissionsRender();
        let cutManagement = this.cutManagerPermissionsRender();
        let colorGlassEdit = this.colorAndTypeGlassEdit();
        let userHistoryTable = this.usersHistoryTable();
        if (sessionStorage.getItem('valid') === '') {
            return (
                <div className="HomePage">
                    <h1>Zaloguj się, aby usyskać dostęp!</h1>
                    <button type="submit" className="success_login" onClick={this.goback} >Logowanie</button>
                </div>
            );
        }
        else {
            return (
                <div className="ControlPanel" >


                    <Sidebar />
                    <div className="conteiner_cp">
                        <div>
                            {typeMachine}
                            {colorGlassEdit}
                            {userHistoryTable}
                        </div>
                        {buttonAdd}
                        <div className="tableuser">
                            {xd}
                        </div>
                    </div>
                </div>

            )
        }
    }


}