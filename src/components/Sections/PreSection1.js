//imports
import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

// import FeatherIcon from 'feather-icons-react';

const PreSection1 = () => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //reach hook form approach
  const [loading, setLoading] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'conditionalForm',
  });

  const value = watch('conditionalForm');

  //dummy data
  const provide_org = 'Anhueser- Busch InBev GCC India';

  const conditionalFormFromBackend = [
    {
      id: 1,
      value: '',
      fieldName: 'Are you still the control owner and part of the org- ' + provide_org,
      fieldType: 'radio',
      fieldSubtitle: '',
      choices: [
        { id: 1, value: 'Yes - I am the owner and part of the org' },
        { id: 2, value: 'No - I am no longer the control owner' },
        { id: 3, value: 'I am the control owner but not part of the org' },
      ],
      required: true,
      children: [
        {
          id: 2,
          value: '',
          fieldName: 'To whom did you give the handover?',
          required: true,
          fieldType: 'text',
          fieldSubtitle: '',
          showWhenParentIs: 'No - I am no longer the control owner',
        },
        {
          id: 3,
          value: '',
          fieldType: 'text',
          required: true,
          fieldSubtitle: '',
          fieldName: 'To which organisation do you belong?',
          showWhenParentIs: 'I am the control owner but not part of the org',
        },
      ],
    },
  ];

  const loader = [
    <div
      className="loader"
      style={{
        color: 'gold',
        margin: '10px',
        padding: '15px',
      }}
    ></div>,
  ];

  const onSelectChange = (index) => {
    value[index]?.children?.forEach((c, childIndex) => {
      const childIndexInForm = value.findIndex((field) => field.id === c.id);

      // if the child is supposed to be shown
      // and doesn't already exist in form/fields
      if (c.showWhenParentIs === value[index].value && childIndexInForm === -1) {
        append(c);
      } else if (c.showWhenParentIs !== value[index].value && childIndexInForm > -1) {
        // when child should not be shown but it exists

        // replace the child object in the parent children array
        // before removing from the form, so that value persists
        // for the time when the child appears again
        value[index].children[childIndex] = value[childIndexInForm];

        remove(childIndexInForm);
      }
    });
  };

  const loadConditionalForm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      conditionalFormFromBackend.forEach((q) => {
        append(q, { shouldFocus: false });
      });
    }, 2000);
  };

  const onSubmit = (data) => {
    //console.log(data);
    console.log(data);
  };

  useEffect(() => {
    loadConditionalForm();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                {' '}
                <span className="golden-text">
                  <h2>
                    <strong>Self Assessment</strong>
                  </h2>
                </span>
                <span>
                  <h4>Please answer to the below questions.</h4>
                </span>
              </div>
            </div>
            <div className="card-body pt-1 pl-2 pr-5">
              <div>
                {loading ? (
                  loader
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      {fields?.map((field, index) => {
                        const fieldData = value[index];
                        const newText = fieldData.fieldSubtitle;
                        return (
                          <div className="card m-3 p-3">
                            <div key={fieldData.id} style={{ marginBottom: '10px' }}>
                              <p>
                                <span className="golden-text" style={{ fontWeight: 'bold' }}>
                                  {index + 1} {`.`} {fieldData.fieldName}
                                </span>{' '}
                              </p>
                              <p>
                                <span className="card-subtitle">
                                  {newText.split('<br/>').map((str) => (
                                    <span>{str}</span>
                                  ))}
                                </span>
                              </p>
                              {fieldData.fieldType === 'radio' ? (
                                <div>
                                  {fieldData?.choices?.map((c) => (
                                    <div>
                                      <label>
                                        <div>
                                          <input
                                            type="radio"
                                            style={{ margin: '4px' }}
                                            key={c.id}
                                            value={c.value}
                                            {...register(`conditionalForm.${index}.value`, {
                                              required: fieldData.required,
                                              onChange: () => onSelectChange(index),
                                            })}
                                          />
                                          {c.value}
                                        </div>
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              ) : null}
                              {fieldData.fieldType === 'text' ? (
                                <div>
                                  <input
                                    style={{ margin: '5px', padding: '7px', height: '35px' }}
                                    {...register(`conditionalForm.${index}.value`, {
                                      required: fieldData.required,
                                    })}
                                  />
                                </div>
                              ) : null}
                              {errors?.conditionalForm?.[index] && (
                                <span style={{ color: 'red', fontSize: 'small' }}>Required</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <br></br>
                    {!loading && fields.length > 0 && (
                      <button className="btn btn-warning mb-5 ml-5 mr-5" type="submit">
                        {' '}
                        Submit{' '}
                      </button>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreSection1;
