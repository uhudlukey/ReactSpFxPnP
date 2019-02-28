import { loadTheme } from 'office-ui-fabric-react/lib/Styling';

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
});

import * as React from 'react';
import styles from './ReactSpFxPnP.module.scss';
import { IReactSpFxPnPProps } from './IReactSpFxPnPProps';
import { TaxonomyPicker, IPickerTerms } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";
import { PeoplePicker } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { TextField } from 'office-ui-fabric-react/lib/TextField';

export default class ReactSpFxPnP extends React.Component<IReactSpFxPnPProps, {}> {
  public render(): React.ReactElement<IReactSpFxPnPProps> {
    return (
      <form>
        <div className={styles.reactSpFxPnP}>
          <div className={styles.container}>
            <div className={`ms-Grid-row ms-bgColor-neutralLight ms-fontColor-white ${styles.row}`}>
              <div className="ms-Grid-col ms-u-sm12 block">
                <TextField label="Standard" />
              </div>
              <div className="ms-Grid-col ms-u-sm12 block">
                <TaxonomyPicker
                  allowMultipleSelections={true}
                  termsetNameOrID="Countries"
                  panelTitle="Select Term"
                  label="Taxonomy Picker"
                  context={this.props.context}
                  onChange={this.onTaxPickerChange}
                  isTermSetSelectable={false}
                /></div>
              <div className="ms-Grid-col ms-u-sm8 block">
                <PeoplePicker
                  context={this.props.context}
                  titleText="People Picker"
                  personSelectionLimit={3}
                  groupName={""} // Leave this blank in case you want to filter from all users
                  showtooltip={true}
                  isRequired={true}
                  disabled={false}
                  selectedItems={this._getPeoplePickerItems} />
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }

  private onTaxPickerChange(terms: IPickerTerms) {
    this.setState({ termKey: terms[0].key.toString() });
    console.log("Terms", terms);
  }

  private _getPeoplePickerItems(items: any[]) {
    console.log('Items:', items);
  }

}
