import { Form, Icon, Input, Button, Checkbox, Select } from 'antd';

const { Option } = Select;

class ManageWebsiteForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <div className="row">
          <div className="col-md-6 mb-3">
            <Form.Item>
              <label htmlFor="popolar-course-1"><b>Popular course - 1</b></label>
              {/* {getFieldDecorator('popolar-course-1', {
                rules: [{ required: true, message: 'Select Popular course - 1' }],
              })( */}
                <Select size="large" placeholder="Select popular course - 1" className="has-full-width is-transparent-bg">
                  <Option value="jack">Jack</Option>
                  <Option value="none">None</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              {/* )} */}
            </Form.Item>
          </div>
          <div className="col-md-6 mb-3">
            <Form.Item>
              <label htmlFor="popolar-course-2"><b>Popular course - 2</b></label>
              {/* {getFieldDecorator('popolar-course-2', {
                rules: [{ required: true, message: 'Select Popular course - 2' }],
              })( */}
                <Select size="large" placeholder="Select popular course - 2" className="has-full-width is-transparent-bg">
                  <Option value="jack">Jack</Option>
                  <Option value="none">None</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              {/* )} */}
            </Form.Item>
          </div>
          <div className="col-md-6 mb-3">
            <Form.Item>
              <label htmlFor="popolar-course-3"><b>Popular course - 3</b></label>
              {/* {getFieldDecorator('popolar-course-3', {
                rules: [{ required: true, message: 'Select Popular course - 3' }],
              })( */}
                <Select size="large" placeholder="Select popular course - 3" className="has-full-width is-transparent-bg">
                  <Option value="jack">Jack</Option>
                  <Option value="none">None</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              {/* )} */}
            </Form.Item>
          </div>
          <div className="col-md-6 mb-3">
            <Form.Item>
              <label htmlFor="popolar-course-4"><b>Popular course - 4</b></label>
              {/* {getFieldDecorator('popolar-course-3', {
                rules: [{ required: true, message: 'Select Popular course - 3' }],
              })( */}
                <Select size="large" placeholder="Select popular course - 4" className="has-full-width is-transparent-bg">
                  <Option value="jack">Jack</Option>
                  <Option value="none">None</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              {/* )} */}
            </Form.Item>
          </div>
          <div className="col-md-6 mb-3">
            <Form.Item>
              <label htmlFor="popolar-course-5"><b>Popular course - 5</b></label>
              {/* {getFieldDecorator('popolar-course-3', {
                rules: [{ required: true, message: 'Select Popular course - 3' }],
              })( */}
                <Select size="large" placeholder="Select popular course - 5" className="has-full-width is-transparent-bg">
                  <Option value="jack">Jack</Option>
                  <Option value="none">None</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              {/* )} */}
            </Form.Item>
          </div>
          <div className="col-md-6 mb-3">
            <Form.Item>
              <label htmlFor="popolar-course-6"><b>Popular course - 6</b></label>
              {/* {getFieldDecorator('popolar-course-3', {
                rules: [{ required: true, message: 'Select Popular course - 3' }],
              })( */}
                <Select size="large" placeholder="Select popular course - 6" className="has-full-width is-transparent-bg">
                  <Option value="jack">Jack</Option>
                  <Option value="none">None</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              {/* )} */}
            </Form.Item>
          </div>
          <div className="col-md-6 mb-3">
            <Form.Item>
              <label htmlFor="beginner-course-1"><b>Beginner course - 1</b></label>
              {/* {getFieldDecorator('beginner-course-1', {
                rules: [{ required: true, message: 'Select Beginner course - 3' }],
              })( */}
                <Select size="large" placeholder="Select beginner course - 1" className="has-full-width is-transparent-bg">
                  <Option value="jack">Jack</Option>
                  <Option value="none">None</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              {/* )} */}
            </Form.Item>
          </div>
          <div className="col-md-6 mb-3">
            <Form.Item>
              <label htmlFor="beginner-course-6"><b>Beginner course - 2</b></label>
              {/* {getFieldDecorator('beginner-course-3', {
                rules: [{ required: true, message: 'Select Beginner course - 2' }],
              })( */}
                <Select size="large" placeholder="Select beginner course - 2" className="has-full-width is-transparent-bg">
                  <Option value="jack">Jack</Option>
                  <Option value="none">None</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              {/* )} */}
            </Form.Item>
          </div>
          <div className="col-md-6 mb-3">
            <Form.Item>
              <label htmlFor="beginner-course-6"><b>Beginner course - 3</b></label>
              {/* {getFieldDecorator('beginner-course-3', {
                rules: [{ required: true, message: 'Select Beginner course - 3' }],
              })( */}
                <Select size="large" placeholder="Select beginner course - 3" className="has-full-width is-transparent-bg">
                  <Option value="jack">Jack</Option>
                  <Option value="none">None</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              {/* )} */}
            </Form.Item>
          </div>

          <div className="col-md-12 mb3">
            <Form.Item className="is-full-width">
              {/* {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="">
                Forgot password
              </a> */}
              <Button
                type="danger"
                htmlType="submit"
                style={{ width: '140px', height: '42px' }}
              >
                Save Update
              </Button>
            </Form.Item>
          </div>

        </div>
      </Form>
    );
  }
}

const WrappedManageWebsiteForm = Form.create({ name: 'login' })(ManageWebsiteForm);

export default WrappedManageWebsiteForm;