import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot, addDoc, setDoc, doc} from 'firebase/firestore';
import db from '../../firebase';
import {Table, Container} from 'react-bootstrap';
import Select from 'react-select'
import AddSkillTag from './AddSkillTag';
function ManagePartnerSkills() {
  const [pSkillTags, setPSkillTags] = useState([])

  useEffect (() => {
    onSnapshot(query(collection(db, `dbs/Pal/partnerSkillTag`)), (snapshot) => {
      setPSkillTags(snapshot.docs.map(doc => ({
        value: doc.id, 
        label: (doc.data().tagClass&&(doc.data().tagClass.label) + " " + doc.data().value)
      })))
    });
  }, [])

  const [pSkillTagClass, setPSkillTagClass] = useState([])

  useEffect (() => {
    onSnapshot(query(collection(db, `dbs/Pal/partnerSkillTagClass`)), (snapshot) => {
      setPSkillTagClass(snapshot.docs.map(doc => ({value: doc.id, label: doc.data().value})))
    });
  }, [])

  const [pSkills, setPSkills] = useState([])
  
  useEffect (() => {
    onSnapshot(query(collection(db, `dbs/Pal/partnerSkills`)), (snapshot) => {
      setPSkills(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])

  const customStyles = {
    option: provided => ({
      ...provided,
      color: 'black'
    }),
    control: provided => ({
      ...provided,
      color: 'black'
    }),
    singleValue: provided => ({
      ...provided,
      color: 'black'
    })
  }

  const updateTags = (tags, pSkill) => {
    setDoc(doc(db, "dbs/Pal/partnerSkills", pSkill.id), {
      tags: tags
    }, {merge: true})
  }

  const addSkillTag = (value, skillClass, tagClass) => {
    console.log(value)
    if (skillClass) {
      addDoc(collection(db, "dbs/Pal/partnerSkillTagClass"), {
        value: value,
      });
    } else {
      addDoc(collection(db, "dbs/Pal/partnerSkillTag"), {
        value: value,
        tagClass: tagClass
      });
    }
  }

  return (
    <Container>
      <h5>Add Tag Classification {"(Mount)"}</h5>
        <AddSkillTag addSkillTag={addSkillTag} skillClass={true} />
      <h5>Add Tag {"(Flying)"}</h5>
        <AddSkillTag addSkillTag={addSkillTag} skillClass={false} pSkillTagClass={pSkillTagClass} customStyles={customStyles} />

      <h3 className='ardela text-center'>Partner Skills</h3>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Title</th>
            <th className='list-txt'>Abillity</th>
            <th className='list-txt'>tags</th>
          </tr>
        </thead>
        <tbody>
          {pSkills.map((skill) => (
            <tr>
              {/* <td className='p-0'><Image src={skill.cover} className="list-cover-img" /></td> */}
              <td className='list-txt'>{skill.title}</td>
              <td className='list-txt'>{skill.ability}</td>
              <td>
                <Select
                  closeMenuOnSelect={false}
                  defaultValue={skill.tags&&(skill.tags)}
                  isMulti
                  options={pSkillTags}
                  styles={customStyles}
                  onChange={(e) => updateTags(e,skill)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
  ;
}

export default ManagePartnerSkills;