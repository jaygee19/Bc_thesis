
export function getAllErrors(errors) {
  if (errors !== undefined && errors.length > 0 && errors.length < 5)
  {
    return (
        <ul className="list-group">
          {errors.map((e, i) => {
            return (
              <li key={i} className="list-group-item list-group-item-danger">
                {' '}
                <span>{e}</span>
              </li>
            )
          })}
        </ul>
      )
  } else if (errors !== undefined && errors.length > 5) {
    return (
      <ul className="list-group">
            <li className="list-group-item list-group-item-danger">
              {' '}
              <span>{errors}</span>
            </li>
      </ul>
    )
  }
    
  }