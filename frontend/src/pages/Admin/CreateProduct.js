import React from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'

const CreateProduct = () => {
  return (
    <Layout>
    <div className="row">
        <div className="col-md-3">
        <AdminMenu/>
        </div>
        <div className="col-md-9">
         create product
        </div>
    </div>
   </Layout>
  )
}

export default CreateProduct
