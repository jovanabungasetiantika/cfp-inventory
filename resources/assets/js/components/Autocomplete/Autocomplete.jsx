import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Select, { components as selectComponents } from 'react-select';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import autocompleteStyle from "../../assets/jss/material-dashboard-react/components/autocompleteStyle";

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  const marginTop = props.selectProps.labelText ? '' : ` ${props.selectProps.marginTop}`
  return (
    // <div>
    //   {props.selectProps.labelText !== undefined ? (
    //     <InputLabel
    //       className={props.selectProps.classes.labelRoot + props.selectProps.labelClasses}
    //       htmlFor={props.selectProps.id}
    //       {...props.selectProps.labelProps}
    //     >
    //       {props.selectProps.labelText}
    //     </InputLabel>
    //   ) : null}
    //   <Input
    //     classes={{
    //       root: props.selectProps.marginTop,
    //       disabled: props.selectProps.classes.disabled,
    //       underline: props.selectProps.underlineClasses
    //     }}
    //     id={props.selectProps.id}
    //     name={props.selectProps.name}
    //     fullWidth
    //     // {...props.selectProps.textFieldProps}
    //   />
    // </div>
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input + " " + props.selectProps.underlineClasses + marginTop,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      InputLabelProps={{
        className: props.selectProps.classes.labelRoot + props.selectProps.labelClasses,
        shrink: true,
        // htmlFor: props.selectProps.id,
        ...props.selectProps.labelProps,
      }}
      label={props.selectProps.labelText}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={event => {
        props.removeProps.onClick();
        props.removeProps.onMouseDown(event);
      }}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

function DropdownIndicator(props) {
  return <selectComponents.DropdownIndicator {...props} className={props.selectProps.classes.dropdownIndicator} />
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
  DropdownIndicator,
};

class Autocomplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showPassword: false,
    }
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    const {
      classes,
      formControlProps,
      labelText,
      id,
      name,
      labelProps,
      inputProps,
      placeholder,
      suggestions,
      error,
      success,
      theme,
    } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
      }),
    };

    const labelClasses = classNames({
      [" " + classes.labelRootError]: error,
      [" " + classes.labelRootSuccess]: success && !error
    });

    const underlineClasses = classNames({
      [classes.underlineError]: error,
      [classes.underlineSuccess]: success && !error,
      [classes.underline]: true
    });

    const marginTop = classNames({
      [classes.marginTop]: labelText === undefined
    });

    return (
      <FormControl
        {...formControlProps}
        className={formControlProps.className + " " + classes.formControl}
      >
        {/* {labelText !== undefined ? (
          <InputLabel
            className={classes.labelRoot + labelClasses}
            htmlFor={id}
            {...labelProps}
          >
            {labelText}
          </InputLabel>
        ) : null}
        <Input
          classes={{
            root: marginTop,
            disabled: classes.disabled,
            underline: underlineClasses
          }}
          id={id}
          name={name}
          {...inputProps}
        /> */}
        <Select
          classes={classes}
          styles={selectStyles}
          options={suggestions}
          components={components}
          id={id}
          name={name}
          marginTop={marginTop}
          labelText={labelText}
          underlineClasses={underlineClasses}
          labelClasses={labelClasses}
          labelProps={labelProps}
          placeholder={placeholder}
          {...inputProps}
        />
        {error ? (
          <Clear className={classes.feedback + " " + classes.labelRootError} />
        ) : success ? (
          <Check className={classes.feedback + " " + classes.labelRootSuccess} />
        ) : null}
      </FormControl>
    );
  }
}

Autocomplete.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
  type: PropTypes.string,
};

export default withStyles(autocompleteStyle, { withTheme: true })(Autocomplete);
