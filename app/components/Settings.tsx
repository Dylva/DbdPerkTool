import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import settingsUtil from '../settings/Settings';
import PlainTextInput from './Form/PlainTextInput';
import log from 'electron-log';

type MyProps = {};
type MyState = { settings: Object; unsaved: boolean };

export default class Settings extends Component<MyProps, MyState> {
  constructor(params: MyProps) {
    super(params);
    this.state = {
      settings: {},
      unsaved: false
    };
  }

  syncSettings() {
    this.setState({
      settings: settingsUtil.settings
    });
  }

  async componentDidMount() {
    await settingsUtil.read();
    return this.syncSettings();
  }

  async doSave(e) {
    e.preventDefault();
    log.info(this);
    settingsUtil.settings.dbdInstallPath = this.state.settings.dbdInstallPath;
    await settingsUtil.save();
    this.setState({
      unsaved: false
    });
  }

  handleDbdPathChanged(event) {
    this.setState({
      settings: {
        dbdInstallPath: event.target.value
      }
    });
  }

  async setDefaultSettings() {
    await settingsUtil.setDefaultSettings();
    this.syncSettings();
    this.setState({
      unsaved: true
    });
  }

  handleFormChanged() {
    this.setState({
      unsaved: true
    });
  }

  render() {
    const saveButtonValue = 'Save' + (this.state.unsaved ? '*' : '');
    return (
      <Col className="col-8">
        <Form
          onSubmit={this.doSave.bind(this)}
          onChange={this.handleFormChanged.bind(this)}
        >
          <PlainTextInput label="Dead By Daylight Install Path" value={this.state.settings.dbdInstallPath} onChange={this.handleDbdPathChanged.bind(this)}/>
          <Button variant="dark" type="submit">
            {saveButtonValue}
          </Button>
          <Button
            variant="dark"
            className="float-right"
            onClick={this.setDefaultSettings.bind(this)}
          >
            Reset to Default
          </Button>
        </Form>
      </Col>
    );
  }
}
