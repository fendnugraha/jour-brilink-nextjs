import { useState } from 'react'

const CreateWarehouse = () => {
    const [formData, setFormData] = useState({
        prefix: '',
        name: '',
        address: '',
    })

    const [errors, setErrors] = useState({
        prefix: '',
        name: '',
        address: '',
    })

    const handleChange = e => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
        setErrors({
            ...errors,
            [name]: value ? '' : `The ${name} field is required`,
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        // Handle form submission logic here
        console.log('Form data submitted:', formData)
    }

    return (
        <div>
            <h2>Create Warehouse</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="prefix">Warehouse Prefix:</label>
                    <input type="text" id="prefix" name="prefix" value={formData.prefix} onChange={handleChange} required />
                    {errors.prefix && <span>{errors.prefix}</span>}
                </div>
                <div>
                    <label htmlFor="name">Warehouse Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    {errors.name && <span>{errors.name}</span>}
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
                    {errors.address && <span>{errors.address}</span>}
                </div>
                <button type="submit">Create Warehouse</button>
            </form>
        </div>
    )
}

export default CreateWarehouse
