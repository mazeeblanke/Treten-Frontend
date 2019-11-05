import React from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false
});

const TutorProfileForm = props => {
  const { setPersonalTutorDetailsForm, personalTutorDetailsForm } = props;
  const { title, social_links, bio } = personalTutorDetailsForm;

  return (
    <div className="row">
      <div className="col-md-6 mt-4">
        <Form.Item className={props.errors.title && "has-error"}>
          <label htmlFor="title">Official job title</label>
          <Input
            value={title}
            size="large"
            type="text"
            onChange={e => setPersonalTutorDetailsForm(e.target.value, "title")}
            placeholder="e.g. Network Engineer"
          />
          {props.errors.title && (
            <div class="ant-form-explain">{props.errors.title}!</div>
          )}
        </Form.Item>
      </div>

      <div className="col-md-6 mt-4">
        <Form.Item
          className={(props.errors.social_links || {}).linkedin && "has-error"}
        >
          <label htmlFor="linkedin">LinkedIn profile</label>
          <Input
            value={social_links.linkedin}
            size="large"
            type="text"
            onChange={e =>
              setPersonalTutorDetailsForm(
                {
                  ...social_links,
                  linkedin: e.target.value
                },
                "social_links"
              )
            }
            placeholder="e.g. https://linkedin.com/in/musahawa"
          />
          {(props.errors.social_links || {}).linkedin && (
            <div class="ant-form-explain">
              {(props.errors.social_links || {}).linkedin}!
            </div>
          )}
        </Form.Item>
      </div>

      <div className="col-md-6 mt-4">
        <Form.Item
          className={(props.errors.social_links || {}).twitter && "has-error"}
        >
          <label htmlFor="twitter">Twitter profile</label>
          <Input
            value={social_links.twitter}
            size="large"
            type="text"
            onChange={e =>
              setPersonalTutorDetailsForm(
                {
                  ...social_links,
                  twitter: e.target.value
                },
                "social_links"
              )
            }
            placeholder="e.g. https://twitter.com/musahawa"
          />
          {(props.errors.social_links || {}).twitter && (
            <div class="ant-form-explain">
              {(props.errors.social_links || {}).twitter}!
            </div>
          )}
        </Form.Item>
      </div>

      <div className="col-md-6 mt-4">
        <Form.Item
          className={(props.errors.social_links || {}).facebook && "has-error"}
        >
          <label htmlFor="facebook">Facebook profile</label>
          <Input
            value={social_links.facebook}
            size="large"
            type="text"
            onChange={e =>
              setPersonalTutorDetailsForm(
                {
                  ...social_links,
                  facebook: e.target.value
                },
                "social_links"
              )
            }
            placeholder="e.g. https://facebook.com/musahawa"
          />
					{(props.errors.social_links || {}).facebook && (
            <div class="ant-form-explain">
              {(props.errors.social_links || {}).facebook}!
            </div>
          )}
        </Form.Item>
      </div>

      <div style={{ width: "300px" }} className="col-md-12 mt-4">
        <Form.Item className={props.errors.bio && "has-error"}>
          <label htmlFor="bio">Brief bio (100 words max)</label>
          <ReactQuill
            value={bio}
            onChange={e => setPersonalTutorDetailsForm(e, "bio")}
            height={300}
          />
          {props.errors.bio && (
            <div class="ant-form-explain">{props.errors.bio}!</div>
          )}
        </Form.Item>
      </div>
    </div>
  );
};

TutorProfileForm.propTypes = {};

export default TutorProfileForm;
