import React, { useEffect } from 'react'
import { IGlobalQuestionProps, IQuestionOptions, AnswerType } from './GlobalQuestion.interface'
import styles from './GlobalQuestion.module.scss'
import { Radio, Checkbox } from '../../../../atoms'
import { useFormHandler } from '../../TestsFormHandler.context'
import { isMissingValidator } from '@utils/validateAnswers/validateStepAnswers'
import GlobalQuestionError from '../GlobalQuestionError/GlobalQuestionError.component'

const GlobalQuestion: React.FC<IGlobalQuestionProps> = ({ question, errorText, idx }) => {
  const { answers, submitted, handleChange, registerQuestion, unregisterQuestion } = useFormHandler()
  const answer = answers[question.id] as AnswerType
  const required = submitted && isMissingValidator(answer, question)

  const onChange = (value: AnswerType) => {
    handleChange(question.id, value)
  }

  useEffect(() => {
    registerQuestion(question.id, question.type)
    return () => {
      unregisterQuestion(question.id)
    }
  }, [question.id, question.type, registerQuestion, unregisterQuestion])

  return (
    <div className={styles['formHandler__question']}>
      <div>
        {idx} - {question.text} {required && <span className={styles['formHandler__question-required']}>{'*'}</span>}
      </div>
      <div className={styles['formHandler__options']}>
        {question.type === 'single' &&
          question.options?.map((opt) => (
            <Radio
              key={opt.id}
              id={`${question.id}-${opt.id}`}
              checked={typeof answer === 'object' && !Array.isArray(answer) && answer?.id === opt.id}
              onChange={() => onChange(opt)}
              type="radio"
            >
              {opt.label}
            </Radio>
          ))}
        {question.type === 'multiple' &&
          question.options?.map((opt) => (
            <Checkbox
              variant="box"
              key={opt.id}
              id={`${question.id}-${opt.id}`}
              checked={Array.isArray(answer) && answer.some((item: IQuestionOptions) => item.id === opt.id)}
              onChange={(checked) => {
                let newValue: IQuestionOptions[] = Array.isArray(answer) ? [...answer] : []
                if (checked) {
                  if (!newValue.some((item: IQuestionOptions) => item.id === opt.id)) {
                    newValue.push(opt)
                  }
                } else {
                  newValue = newValue.filter((item: IQuestionOptions) => item.id !== opt.id)
                }
                onChange(newValue)
              }}
            >
              {opt.label}
            </Checkbox>
          ))}
      </div>
      {required && <GlobalQuestionError errorText={errorText} />}
    </div>
  )
}
export default GlobalQuestion
