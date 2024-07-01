import React from 'react';
import './FormHeader.scss';
import BackArrowNav from '../BackArrowNav/BackArrowNav';
import DetailsEditButton from '../DetailsEditButton/DetailsEditButton';

const FormHeader = ({ title, editPath }) => {
  console.log(editPath)
  return ( 
    <section className="page-top page-top__divider">
      <div className="page-top__left">
        <h1 className="form-header__title">
          <BackArrowNav />
          {title}
        </h1>
      </div>
      {editPath ? <DetailsEditButton /> : null}
    </section>
  )
}

export default FormHeader
