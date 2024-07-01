import React from 'react';
import './FormHeader.scss';
import BackArrowNav from '../BackArrowNav/BackArrowNav';

const FormHeader = ({title}) => {
  return ( 
    <section className="page-top page-top__divider">
      <h1 className="form-header__title">
        <BackArrowNav />
        {title}
      </h1>
    </section>
  )
}

export default FormHeader
