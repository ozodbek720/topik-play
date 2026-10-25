import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        localStorage: 'readonly',
        Notification: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        fetch: 'readonly',
        alert: 'readonly',
        confirm: 'readonly',
        prompt: 'readonly',
        navigator: 'readonly',
        performance: 'readonly',
        Headers: 'readonly',
        Request: 'readonly',
        Response: 'readonly',
        JSON: 'readonly',
        Promise: 'readonly',
        Array: 'readonly',
        Object: 'readonly',
        String: 'readonly',
        Number: 'readonly',
        Math: 'readonly',
        Date: 'readonly',
        RegExp: 'readonly',
        Error: 'readonly',
        TypeError: 'readonly',
        ReferenceError: 'readonly',
        SyntaxError: 'readonly',
        encodeURIComponent: 'readonly',
        decodeURIComponent: 'readonly',
        btoa: 'readonly',
        atob: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        Blob: 'readonly',
        FileReader: 'readonly',
        FileReaderSync: 'readonly',
        XMLHttpRequest: 'readonly',
        AbortController: 'readonly',
        Intl: 'readonly',
        crypto: 'readonly',
        screen: 'readonly',
        innerWidth: 'readonly',
        innerHeight: 'readonly',
        outerWidth: 'readonly',
        outerHeight: 'readonly',
        getComputedStyle: 'readonly',
        matchMedia: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        scrollTo: 'readonly',
        scrollBy: 'readonly',
        getSelection: 'readonly',
        match: 'readonly',
        speechSynthesis: 'readonly',
        SpeechSynthesisUtterance: 'readonly',
        SpeechSynthesisVoice: 'readonly'
      }
    },
    plugins: {
      react: react,
      'react-hooks': reactHooks
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-empty': 'off',
      'no-case-declarations': 'off'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
]
