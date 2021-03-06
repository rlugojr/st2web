import React from 'react';


class Label extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    children: React.PropTypes.any.isRequired
  }

  render() {
    const props = {
      className: 'st2-auto-form__label ' + (this.props.className || 'st2-auto-form__text-field')
    };

    return <label {...props}>
      { this.props.children }
    </label>;
  }
}

class Title extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    spec: React.PropTypes.object
  }

  render() {
    let name = this.props.spec.name || this.props.name;

    if (this.props.spec.required) {
      name += ' *';
    }

    return <div className='st2-auto-form__title'>
      { name }
    </div>;
  }
}

class ErrorMessage extends React.Component {
  static propTypes = {
    children: React.PropTypes.string
  }

  render() {
    const props = {
      className: 'st2-auto-form__error'
    };

    return <span {...props} >
      { this.props.children }
    </span>;
  }
}

class Icon extends React.Component {
  static propTypes = {
    name: React.PropTypes.string
  }

  render() {
    const { name } = this.props;

    const props = {
      className: 'st2-auto-form__type'
    };

    return <span {...props}>{ name }</span>;
  }
}

class Button extends React.Component {
  static propTypes = {
    icon: React.PropTypes.string,
    title: React.PropTypes.string,
    onClick: React.PropTypes.func
  }

  handleClick(e) {
    e.preventDefault();
    return this.props.onClick && this.props.onClick(e);
  }

  render() {
    const props = {
      className: `st2-auto-form__button icon-${this.props.icon}`,
      onClick: (e) => this.handleClick(e),
      title: this.props.title
    };

    return <span {...props} />;
  }
}

class Description extends React.Component {
  static propTypes = {
    spec: React.PropTypes.object
  }

  render() {
    return <p className='st2-auto-form__description'>
      { this.props.spec.description }
    </p>;
  }
}

export class TextFieldWrapper extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    spec: React.PropTypes.object,
    value: React.PropTypes.any,
    invalid: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    children: React.PropTypes.element.isRequired,
    icon: React.PropTypes.string,
    labelClass: React.PropTypes.string
  }

  render() {
    const line = <div className='st2-auto-form__line'>
      <Label className={this.props.labelClass} >
        <Title {...this.props} />
        <ErrorMessage>{ this.props.invalid }</ErrorMessage>
        <Icon name={ this.props.icon } />
        { this.props.children }
      </Label>
      <Description {...this.props} />
    </div>;

    return line;
  }
}

export class BooleanFieldWrapper extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    spec: React.PropTypes.object,
    value: React.PropTypes.any,
    disabled: React.PropTypes.bool,
    children: React.PropTypes.element.isRequired,
    onReset: React.PropTypes.func
  }

  handleReset() {
    return this.props.onReset && this.props.onReset();
  }

  render() {
    const { name, spec } = this.props;

    const blockProps = {
      className: 'st2-auto-form__checkbox-block',
    };

    const buttonProps = {
      icon: 'cross',
      title: 'reset default',
      onClick: () => this.handleReset()
    };

    const labelProps = {
      className: 'st2-auto-form__checkbox-label',
    };

    const line = <div className='st2-auto-form__line'>
      <Label>
        <div {...blockProps} >
          { !this.props.disabled && <Button {...buttonProps} /> }
          { this.props.children }
          <span {...labelProps} >{ spec.name || name }</span>
        </div>
      </Label>
      <Description {...this.props} />
    </div>;

    return line;
  }
}
