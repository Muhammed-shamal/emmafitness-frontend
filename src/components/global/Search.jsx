'use client'
import { SearchOutlined } from "@ant-design/icons"
import { Select } from "antd"
import { useState } from "react"
import fetchApi from "../../utility/api/fetchApi"
import { useRouter } from "next/navigation"

function Search() {

  const [data, setData] = useState([])
  const [terms, setTerms] = useState()

  const router = useRouter()

  let timeout;
  let currentValue;

  const fetching = (value, callback) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    currentValue = value;
    const fake = () => {
      fetchApi({ URI: `public/products/search?q=${encodeURIComponent(value)}&sort=desc` })
        .then((d) => {
          if (currentValue === value) {
            const { data } = d;

            if (!data || data.length === 0) {
              callback([
                {
                  value: '',
                  label: 'No products found',
                  isDisabled: true, // optional if using a select component
                },
              ]);
              return;
            }

            const MAX_LENGTH = 100;
            const ndata = data.map((item) => ({
              value: item?.slug,
              label:
                item?.name.length > MAX_LENGTH
                  ? `${item?.name.slice(0, MAX_LENGTH)}...`
                  : item?.name,
            }));

            callback(ndata);
          }
        });
    };
    if (value) {
      timeout = setTimeout(fake, 300);
    } else {
      callback([]);
    }
  };


  const searchHandle = (newValue) => {
    fetching(newValue, setData)
  }

  const changeHandle = (e) => {
    const a = e
    router.push('/product/' + a)
  }

  const searchTermHandle = (e) => {
    setTerms(e.target.value)
    if (e.key === 'Enter') {
      router.push(`/search?term=${terms}`)
    }
  }

  const formHandle = (e) => {
    e.preventDefault()
    router.push(`/search?term=${terms}`)
  }

  return (
    <form onSubmit={formHandle} className='h-10  flex flex-row'>
      <Select
        showSearch={true}
        defaultActiveFirstOption={false}
        onSearch={searchHandle}
        filterOption={false}
        notFoundContent={null}
        onSelect={changeHandle}
        onKeyUp={searchTermHandle}
        suffixIcon={false}
        value={terms}
        options={data}
        loading={'loading...'}
        style={{ borderRadius: 0, borderBottomLeftRadius: 3, borderTopLeftRadius: 3 }}
        placeholder='What are you looking for?'
        className='h-10 rounded-l flex-1 bg-lightPrimary md:bg-white border-none text-white placeholder:text-gray-400 ' >
      </Select>

      <button onClick={formHandle} className='bg-secondary text-white h-10 border-none rounded-r w-8 md:w-20 text-xl flex justify-center items-center rounded-none hover:bg-darkSecondary '><SearchOutlined /></button>
    </form>
  )
}

export default Search