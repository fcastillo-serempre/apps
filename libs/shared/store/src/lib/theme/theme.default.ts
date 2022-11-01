export const theme = {
  avatar: {
    base: 'flex items-center space-x-4',
    size: {
      xs: 'w-6 h-6',
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-16 h-16',
      xl: 'w-24 h-24',
    },
    rounded: '!rounded-full',
    bordered: 'p-1 ring-2 ring-slate-500',
    img: {
      off: 'rounded relative overflow-hidden bg-slate-100 dark:bg-slate-600',
      on: 'rounded',
    },
  },
  button: {
    base: 'group inline-flex items-center justify-center text-center font-normal focus:z-10 rounded transition-colors focus:ring-2 cursor-pointer',
    size: {
      xs: 'text-xs px-2',
      sm: 'text-sm px-3',
      md: 'text-sm px-3 h-8',
      lg: 'text-base px-5 py-2',
      xl: 'text-base px-10',
    },
    color: {
      info: 'text-white bg-blue-600 border border-transparent hover:bg-blue-700 focus:ring-blue-300',
      failure:
        'text-white bg-red-700 border border-transparent hover:bg-red-800 focus:ring-red-300 disabled:hover:bg-red-700',
      success: 'text-green-700 bg-green-100 border-green-500',
      warning: 'text-yellow-700 bg-yellow-100 border-yellow-500',
      inherit: '',
    },
    disabled:
      'cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500 disabled:border-slate-700',
    variant: {
      contained: '',
      outlined:
        'border bg-transparent border-slate-700 bg-slate-800 hover:bg-transparent hover:bg-slate-700 disabled:hover:bg-slate-800',
      link: 'hover:underline focus:ring-0 font-medium',
    },
  },
  textField: {
    base: 'w-full transition-colors border rounded bg-slate-900 border-slate-600 text-white hover:border-slate-500 focus:border-blue-500 focus:outline-0 placeholder-slate-500',
    size: {
      xs: 'text-xs px-2', // TODO: fix this
      sm: 'text-sm px-3', // TODO: fix this
      md: 'text-sm px-3 h-8',
      lg: 'text-base px-5 py-2', // TODO: fix this
      xl: 'text-base px-10', // TODO: fix this
    },
    disabled: 'opacity-50',
    state: {
      failure: 'border-red-500 focus:border-red-500',
      success: '', // TODO: add warning state
      warning: '', // TODO: add warning state
      inherit:
        'disabled:border-slate-800 disabled:text-slate-500 disabled:placeholder-slate-700 disabled:select-none',
    },
  },
  typography: {
    base: '',
    variant: {
      h1: 'text-5xl font-semibold',
      h2: 'text-4xl font-semibold',
      h3: 'text-3xl font-semibold',
      h4: 'text-2xl font-semibold',
      h5: 'text-xl font-semibold',
      h6: 'text-base font-semibold',
      body2: 'text-base font-normal',
      body1: 'text-sm font-normal',
    },
  },
};
