import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'

const CreateCategory = () => {
  return (
   <Layout>
    <div className="row">
        <div className="col-md-3">
        <AdminMenu/>
        </div>
        <div className="col-md-9">
            All users
        </div>
    </div>
   </Layout>
  )
}

export default CreateCategory
