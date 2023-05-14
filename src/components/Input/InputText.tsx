import { useState } from 'react'
export interface formFuncInput {
  updateType: string
  value: string
}

type updateFormFunc = (Input: formFuncInput) => void

interface Props {
  labelTitle?: string
  labelStyle?: string
  type?: string
  containerStyle?: string
  defaultValue?: string
  placeholder?: string
  updateFormValue: updateFormFunc
  updateType: string
}

function InputText (props: Props) {
  const { labelTitle, labelStyle = '', type = 'text', containerStyle = '', defaultValue, placeholder = '', updateFormValue, updateType } = props
  const [value, setValue] = useState(defaultValue)

  const updateInputValue = (val: string) => {
    setValue(val)
    updateFormValue({ updateType, value: val })
  }

  return (
        <div className={`flex flex-col w-full ${containerStyle}`}>
            <label className=" flex select-none items-center justify-between py-2 px-1 text-base">
                <span className={` text-sm text-base-content ${labelStyle}`}>{labelTitle}</span>
            </label>
            <input type={type} value={value} placeholder={ placeholder} onChange={(e) => { updateInputValue(e.target.value) }}
            className=" flex-shrink h-12 px-4 text-base border-secondaryText/50 border-[1px] outline-secondaryText/50 rounded-l-full rounded-r-full 
             bg-current/50 w-full transition-all focus:outline-[2px] focus:outline-offset-2 focus:outline-current/20 " />
        </div>
  )
}
// .input {
//     flex-shrink: 1;
//     transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
//     transition-duration: 200ms;
//     transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
//     height: 3rem/* 48px */;
//     padding-left: 1rem/* 16px */;
//     padding-right: 1rem/* 16px */;
//     font-size: 0.875rem/* 14px */;
//     font-size: 1rem/* 16px */;
//     line-height: 1.25rem/* 20px */;
//     line-height: 2;
//     line-height: 1.5rem/* 24px */;
//     border-width: 1px;
//     border-color: hsl(var(--bc) / var(--tw-border-opacity));
//     --tw-border-opacity: 0;
//     --tw-bg-opacity: 1;
//     background-color: hsl(var(--b1) / var(--tw-bg-opacity));
//     border-radius: var(--rounded-btn, 0.5rem);
//   }
//   .input-group > .input {
//     isolation: isolate;
//   }
//   .input-group > *,
//   .input-group > .input,
//   .input-group > .textarea,
//   .input-group > .select {
//     border-radius: 0px;
//   }
//   .input[list]::-webkit-calendar-picker-indicator {
//     line-height: 1em;
//   }
//   .input:focus {
//     outline: 2px solid hsla(var(--bc) / 0.2);
//     outline-offset: 2px;
//   }
//   .input-disabled,
//   .input[disabled] {
//     cursor: not-allowed;
//     --tw-border-opacity: 1;
//     border-color: hsl(var(--b2, var(--b1)) / var(--tw-border-opacity));
//     --tw-bg-opacity: 1;
//     background-color: hsl(var(--b2, var(--b1)) / var(--tw-bg-opacity));
//     --tw-text-opacity: 0.2;
//   }
//   .input-disabled::placeholder,
//   .input[disabled]::placeholder {
//     color: hsl(var(--bc) / var(--tw-placeholder-opacity));
//     --tw-placeholder-opacity: 0.2;
//   }
export default InputText
