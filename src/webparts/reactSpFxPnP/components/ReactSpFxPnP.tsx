/* import { loadTheme } from 'office-ui-fabric-react/lib/Styling';

loadTheme({
  palette: {
    themePrimary: '#0078d4',
    themeLighterAlt: '#eff6fc',
    themeLighter: '#deecf9',
    themeLight: '#c7e0f4',
    themeTertiary: '#71afe5',
    themeSecondary: '#2b88d8',
    themeDarkAlt: '#106ebe',
    themeDark: '#005a9e',
    themeDarker: '#004578',
    neutralLighterAlt: '#f8f8f8',
    neutralLighter: '#f4f4f4',
    neutralLight: '#eaeaea',
    neutralQuaternaryAlt: '#dadada',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c8c8',
    neutralTertiary: '#c2c2c2',
    neutralSecondary: '#858585',
    neutralPrimaryAlt: '#4b4b4b',
    neutralPrimary: '#333333',
    neutralDark: '#272727',
    black: '#1d1d1d',
    white: '#ffffff',
  }
}); */

import * as React from 'react';
import styles from './ReactSpFxPnP.module.scss';
import { IReactSpFxPnPProps } from './IReactSpFxPnPProps';
import { TaxonomyPicker, IPickerTerms } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";
import { PeoplePicker } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { IReactSpFxPnP } from './IReactSpFxPnP';
import { default as pnp, ItemAddResult } from "sp-pnp-js";
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/components/Button';
import { FieldUserRenderer } from "@pnp/spfx-controls-react/lib/FieldUserRenderer";
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { FieldRendererHelper } from '@pnp/spfx-controls-react/lib/Utilities';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import {
  assign,
  autobind
} from 'office-ui-fabric-react/lib/Utilities';


export default class ReactSpFxPnP extends React.Component<IReactSpFxPnPProps, IReactSpFxPnP> {
  constructor() {   
    super();
    this.handleTitle = this.handleTitle.bind(this);
    this.handleDesc = this.handleDesc.bind(this);
    this._onCheckboxChange = this._onCheckboxChange.bind(this);
    this._onRenderFooterContent = this._onRenderFooterContent.bind(this);
    this.createItem = this.createItem.bind(this);
    this.onTaxPickerChange = this.onTaxPickerChange.bind(this);
    this._getManager = this._getManager.bind(this);
    this.state = {
      name:"",
      description:"",
      selectedItems: [],
      hideDialog: true,
      showPanel: false,
      dpselectedItem: undefined,
      dpselectedItems: [],  
      disableToggle:false,
      defaultChecked:false,
      termKey: undefined,
      userIDs: [],
      userManagerIDs: [],
      pplPickerType: "",
      status:"",
      isChecked: false,
      required:"This is required",
      onSubmission:false,
      termnCond:false,
    }
  }

  public render(): React.ReactElement<IReactSpFxPnPProps> {
    const { dpselectedItem, dpselectedItems } = this.state;
    const { name, description } = this.state;   
    pnp.setup({
        spfxContext: this.props.context
    });

    return (
      <form>
        {/* TODO:

          - get submit working (the buttons don't even appear?)
          - fix formatting (colours and layout of labels and input)
          - add a title 
         */}  
        <div className={styles.reactSpFxPnP}>
          <div className={styles.container}>
            <div className={`ms-Grid-row ms-bgColor-neutralLight ms-fontColor-white ${styles.row}`}>
              <div className="ms-Grid-col ms-u-sm4 block">
                <label className="ms-Label">Title</label>             
              </div>
              <div className="ms-Grid-col ms-u-sm8 block">
                <TextField
                  value={this.state.name}
                  required={true}
                  onChanged={this.handleTitle}
                  errorMessage={(this.state.name.length === 0 && this.state.onSubmission === true) ? this.state.required : ""}
                /></div>
              <div className="ms-Grid-col ms-u-sm4 block">
                <label className="ms-Label">Submitter Name</label>
              </div>
              <div className="ms-Grid-col ms-u-sm8 block">
                <PeoplePicker
                  context={this.props.context}
                  personSelectionLimit={3}
                  groupName={""} // Leave this blank in case you want to filter from all users
                  showtooltip={true}
                  isRequired={true}
                  disabled={false}
                  selectedItems={this._getPeoplePickerItems} /></div>
              <div className="ms-Grid-col ms-u-sm4 block">
                <label className="ms-Label">Academic Lead</label>
              </div>
              <div className="ms-Grid-col ms-u-sm8 block">
                <PeoplePicker
                  context={this.props.context}
                  // titleText="Academic Lead"
                  personSelectionLimit={3}
                  groupName={""} // Leave this blank in case you want to filter from all users
                  showtooltip={true}
                  isRequired={true}
                  disabled={false}
                  selectedItems={this._getPeoplePickerItems} /></div>
              <div className="ms-Grid-col ms-u-sm4 block">
                <label className="ms-Label">School or Service</label>
              </div>
              <div className="ms-Grid-col ms-u-sm12 block">
                <TaxonomyPicker
                  allowMultipleSelections={false}
                  termsetNameOrID="Schools and Services"
                  panelTitle="Select Term"
                  label=""
                  context={this.props.context}
                  onChange={this.onTaxPickerChange}
                  isTermSetSelectable={false}
                /></div>
              <div className="ms-Grid-col ms-u-sm4 block">
                <label className="ms-Label">Instructed Before?</label>
              </div>
              <div className="ms-Grid-col ms-u-sm12 block">
                <Toggle
                  defaultChecked={false}
                  // label="Instructed Before?"
                  onText="Yes"
                  offText="No"
                  /></div>
              <div className="ms-Grid-col ms-u-sm4 block">
                <label className="ms-Label">Quick Response Required?</label>
              </div>
              <div className="ms-Grid-col ms-u-sm12 block">
                <Toggle
                  defaultChecked={false}
                  // label="Quick response required?"
                  onText="Yes"
                  offText="No"
                  /></div>
              <div className="ms-Grid-col ms-u-sm4 block">
                <label className="ms-Label">Lexcel Assessed?</label>
              </div>
              <div className="ms-Grid-col ms-u-sm12 block">
                <Toggle
                  defaultChecked={true}
                  // label="Lexcel Assessed?"
                  onText="Yes"
                  offText="No"
                  /></div>
              <div className="ms-Grid-col ms-u-sm6 block">
              </div>
              <div className="ms-Grid-col ms-u-sm2 block">
                <PrimaryButton text="Create" onClick={() => { this.validateForm(); }} />
              </div>
              <div className="ms-Grid-col ms-u-sm2 block">
                <DefaultButton text="Cancel" onClick={() => { this.setState({}); }} />
              </div>
              <div>
                <Panel
                  isOpen={this.state.showPanel}
                  type={PanelType.smallFixedFar}
                  onDismiss={this._onClosePanel}
                  isFooterAtBottom={false}
                  headerText="Are you sure you want to submit the form ?"
                  closeButtonAriaLabel="Close"
                  onRenderFooterContent={this._onRenderFooterContent}
                ><span>Please check the details filled and click on Confirm button to submit form.</span>
                </Panel>
              </div>
              <Dialog
                hidden={this.state.hideDialog}
                onDismiss={this._closeDialog}
                dialogContentProps={{
                  type: DialogType.largeHeader,
                  title: 'Request Submitted Successfully',
                  subText: "" }}
                  modalProps={{
                    titleAriaId: 'myLabelId',
                    subtitleAriaId: 'mySubTextId',
                    isBlocking: false,
                    containerClassName: 'ms-dialogMainOverride'            
                  }}>
              <div dangerouslySetInnerHTML={{__html:this.state.status}}/>    
              <DialogFooter>
                <PrimaryButton onClick={()=>this.gotoHomePage()} text="OK" />
                </DialogFooter>
              </Dialog>
            </div>
          </div>
        </div>
      </form>
    );
  }

  private _getPeoplePickerItems(items: any[]) {
    console.log('Items:', items);
  }

  private onTaxPickerChange(terms : IPickerTerms) {
    this.setState({ termKey: terms[0].key.toString() });
    console.log("Terms", terms);
  }
 
  private _getManager(items: any[]) {
    this.state.userManagerIDs.length = 0;
    for (let item in items)
    {   
      this.state.userManagerIDs.push(items[item].id);
      console.log(items[item].id);
    }
  }
 
  private _onRenderFooterContent = (): JSX.Element => {
    return (
      <div>
        <PrimaryButton onClick={this.createItem} style={{ marginRight: '8px' }}>
          Confirm
        </PrimaryButton>
        <DefaultButton onClick={this._onClosePanel}>Cancel</DefaultButton>
      </div>
    );
  }
  
  private _log(str: string): () => void {
    return (): void => {
      console.log(str);
    };
  }
  
  private _onClosePanel = () => {
    this.setState({ showPanel: false });
  }
  
  private _onShowPanel = () => {
    this.setState({ showPanel: true });
  }
  
  private _changeSharing(checked:any):void{
    this.setState({defaultChecked: checked});
  }
  
  private _changeState = (item: IDropdownOption): void => {
    console.log('here is the things updating...' + item.key + ' ' + item.text + ' ' + item.selected);
    this.setState({ dpselectedItem: item });
    if(item.text == "Employee")
    {
      this.setState({defaultChecked: false});
      this.setState({disableToggle: true});     
    }
    else
    {
      this.setState({disableToggle:false});
    }
  }
  
  private handleTitle(value: string): void {
    return this.setState({
      name: value
    });
  }
  
  private handleDesc(value: string): void {
    return this.setState({
      description: value
    });
  }
  
  private _onCheckboxChange(ev: React.FormEvent<HTMLElement>, isChecked: boolean): void {
    console.log(`The option has been changed to ${isChecked}.`);
    this.setState({termnCond: (isChecked)?true:false});
  }
  
  private _closeDialog = (): void => {
    this.setState({ hideDialog: true });
  }
  
  private _showDialog = (status:string): void => {   
    this.setState({ hideDialog: false });
    this.setState({ status: status });
  }
  
  private validateForm():void{
    let allowCreate: boolean = true;
    this.setState({ onSubmission : true });

    if(this.state.name.length === 0)
    {
      allowCreate = false;
    }
    if(this.state.termKey === undefined)
    {
      allowCreate = false;
    }   

    if(allowCreate)
    {
       this._onShowPanel();
    }
    else
    {
      //do nothing
    } 
  }
 
  private createItem():void { 
    this._onClosePanel(); 
    this._showDialog("Submitting Request");
    console.log(this.state.termKey);
    pnp.sp.web.lists.getByTitle("Instruction Form").items.add({
      Title: this.state.name /*,
      Department: this.state.dpselectedItem.key,
      Projects: {
        __metadata: { "type": "SP.Taxonomy.TaxonomyFieldValue" },
        Label: "1",
        TermGuid: this.state.termKey,
        WssId: -1
      },
    Reporting_x0020_ManagerId: this.state.userManagerIDs[0] */
  }).then((iar: ItemAddResult) => {
      this.setState({ status: "Your request has been submitted sucessfully " });
  });
  }
  
  private gotoHomePage():void{
    window.location.replace(this.props.siteUrl);
  }

}