import { useEffect, useState } from 'react'

export function TodoFilter(props) {
  const [filterBy, setFilterBy] = useState(props.filterBy || { title: '' })

  useEffect(() => {
    if (!filterBy) return
    props.onChangeFilter(filterBy)
  }, [filterBy])

  function handleChangeFilter({ target }) {
    const field = target.name
    let value = target.value

    setFilterBy((prevFilterBy) => ({
      ...prevFilterBy,
      [field]: value,
    }))
  }

  if (!filterBy) return <div>Loading...</div>
  const { title } = filterBy
  return (
    <section>
      <label htmlFor="title" className="form-label">
        Free Search
      </label>
      <input onChange={handleChangeFilter} id="title" type="text" name="title" className="form-input" value={title} autoComplete="off" />
      <label htmlFor="category" className="form-label">
        Search by Category
      </label>
      <select onChange={handleChangeFilter} id="category" name="category" className="form-input">
        <option value="">All</option>
        <option value="Health">Health</option>
        <option value="Kids">Kids</option>
        <option value="Work">Work</option>
        <option value="Household">Household</option>
        <option value="Finance">Finance</option>
      </select>

      <label htmlFor="priority" className="form-label">
        Search by Priority
      </label>
      <select onChange={handleChangeFilter} id="priority" name="priority" className="form-input">
        <option value="">All</option>
        <option value="High priority">High priority</option>
        <option value="Medium priority">Medium priority</option>
        <option value="Low priority">Low priority</option>
      </select>

      <label htmlFor="status" className="form-label">
        Search by Status
      </label>
      <select onChange={handleChangeFilter} id="status" name="status" className="form-input">
        <option value="">All</option>
        <option value="Active">Active</option>
        <option value="Done">Done</option>
      </select>
    </section>
  )
}
