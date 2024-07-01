import React from 'react';
import './FormHeader.scss';
import BackArrowNav from '../BackArrowNav/BackArrowNav';
import DetailsEditButton from '../DetailsEditButton/DetailsEditButton';

const FormHeader = ({ title, editPath, monster }) => {
  console.log(monster)
  return ( 
    <section className="page-top page-top__divider">
      <div className="page-top__left">
        <h1 className="form-header__title">
          <BackArrowNav />
          {title}
        </h1>
      </div>
      {editPath ? <DetailsEditButton /> : 'hello'}
    </section>
  )
}

export default FormHeader
