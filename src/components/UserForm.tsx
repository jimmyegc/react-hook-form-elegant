import { useState } from "react"
import validator from 'validator'
import Select from 'react-select'
import { useForm, useController } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { string, z } from 'zod'

const schema = z.object({
  name: string().min(1, { message: "Name is required" }),
  email: string().email(),
  website: string().url().optional(),
  country: string()
})

const countryOptions = [
  { value: "asgard", label: "Asgard" },
  { value: "scotland", label: "Scotland" },
  { value: "usa", label: "USA" }]

export const UserForm = ({ onSave, user = {} }) => {
  const { register, control, handleSubmit, formState } = useForm({
    defaultValues: user,
    resolver: zodResolver(schema)
  })
  const { field } = useController({ name: 'country', control })
  const { errors } = formState


  const handleSelectChange = (option) => {
    field.onChange(option.value)
  }

  const handleSave = (formValues) => {
    onSave(formValues)
  }

  return (<>
    <h2>UserForm</h2>
    <form onSubmit={handleSubmit(handleSave)}>
      <div>
        <p>Name</p>
        <input {...register("name")} />
        <div>{errors.name?.message}</div>
      </div>
      <div>
        <p>Email</p>
        <input {...register("email")} />
        <div>{errors.email?.message}</div>
      </div>
      <div>
        <p>Website</p>
        <input {...register("website")} />
        <div>{errors.website?.message}</div>
      </div>

      <div>
        <p>Country</p>
        <Select
          value={countryOptions.find(({ value }) => value === field.value)}
          onChange={handleSelectChange}
          options={countryOptions} />
        <div>{errors.country?.message}</div>
      </div>

      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  </>)
}