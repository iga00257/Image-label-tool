interface Props {
  open?: boolean
  children?: React.ReactNode
  title?: string
  onSave?: () => void
  onClose?: () => void
}

const FormModal = ({
  open = true,
  children,
  title = 'Default Title',
  onSave = () => {},
  onClose = () => {}
}: Props) => {
  return (
      <div
        className={`relative z-10 opacity-0
        transition-all
       duration-1000
        ease-out  ${open ? 'opacity-100  ' : ' hidden '}`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        {/* <!--
      Background backdrop, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    --> */}
        <div className={'fixed inset-0 bg-gray-500/20 '}></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            {/* <!--
          Modal panel, show/hide based on modal state.

          Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        --> */}
            <div className="relative overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="w-full bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                    {title}
                  </h3>
                  <div className="mt-2">{children}</div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={() => {
                    onSave()
                  }}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => {
                    onClose()
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
export default FormModal
