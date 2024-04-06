import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Select from 'react-select'

function AddSkillTag({addSkillTag, skillClass, pSkillTagClass, customStyles}) {
  console.log(pSkillTagClass)
  const [tagClass, setTagClass] = useState()

  function handleSubmit(e) {
    e.preventDefault()
    addSkillTag(e.currentTarget.elements.value.value, skillClass, tagClass)
  }

  if (skillClass) {
    return (
      <Form onSubmit={handleSubmit} className="d-flex" >
        <Form.Group className="mb-3">
          <Form.Label>{"Tag"}</Form.Label>
          <Form.Control id='value' />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  } else {
    return (
      <Form onSubmit={handleSubmit} className="d-flex" >
        <Form.Group className="mb-3">
          <Form.Label>{"Tag"}</Form.Label>
          <Form.Control id='value' />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{"Tag Classification"}</Form.Label>
          <Select
            closeMenuOnSelect={false}
            options={pSkillTagClass}
            styles={customStyles}
            onChange={(e) => setTagClass(e)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default AddSkillTag;