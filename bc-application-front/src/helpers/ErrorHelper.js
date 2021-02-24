export function getErrorsView(errors) {
    return (
      errors !== undefined &&
      errors.length > 0 && (
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
    )
  }