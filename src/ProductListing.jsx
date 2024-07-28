import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import Header from './Header'
import Product from './Product'
import Loading from "./Loading";
import { useParams } from 'react-router-dom'

const sortOptions = [
  { name: 'Ascending Order', sort: 'asc', href: '#', current: false },
  { name: 'Desending Order', sort: 'desc', href: '#', current: true },
]
const subCategories = [
  { name: 'Totes', href: '#' },
  { name: 'Backpacks', href: '#' },
  { name: 'Travel Bags', href: '#' },
  { name: 'Hip Bags', href: '#' },
  { name: 'Laptop Sleeves', href: '#' },
]
const filters = [
  {
    id: 'category',
    name: 'Categories',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductListing() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const [open, setOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  const [products, setProducts] = useState([]);
  const [loading,setLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  
  const parameters = useParams();

  const [categoryName, setCategoryName] = useState(parameters.category);

  const [sortFilter, setSortFilter] = useState('asc');

  let filterSorting = (sorting)=> {
    setLoading(true);
    setSortFilter(sorting);
  }

  let filterCategoryName = (categoryName)=> {
    setLoading(true);
    setCategoryName(categoryName);
  }

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      setCategories(response);
    })
    .catch(() => {
      console.log('Something went wrong !!');
    })
  },[]);


  useEffect(() => {
      if(categoryName == undefined){
        var APIURL = 'https://fakestoreapi.com/products?sort='+sortFilter;
      } else {
        var APIURL = 'https://fakestoreapi.com/products/category/'+categoryName+'?'+sortFilter;
      }

      fetch(APIURL)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setLoading(false);
        setProducts(response)
      })
  },[categoryName, sortFilter]);


  return (
    <>
      <Header setOpen={setOpen} cartItems={cartItems}/>
    
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative flex flex-col w-full h-full max-w-xs py-4 pb-12 ml-auto overflow-y-auto bg-white shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                      <button
                        type="button"
                        className="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 bg-white rounded-md"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4 border-t border-gray-200">
                      

                      {filters.map((section) => (
                        <Disclosure as="div" key={section.id} className="px-4 py-6 border-t border-gray-200">
                          {({ open }) => (
                            <>
                              <h3 className="flow-root -mx-2 -my-3">
                                <Disclosure.Button className="flex items-center justify-between w-full px-2 py-3 text-gray-400 bg-white hover:text-gray-500">
                                  <span className="font-medium text-gray-900">{section.name}</span>
                                  <span className="flex items-center ml-6">
                                    {open ? (
                                      <MinusIcon className="w-5 h-5" aria-hidden="true" />
                                    ) : (
                                      <PlusIcon className="w-5 h-5" aria-hidden="true" />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  {section.options.map((option, optionIdx) => (
                                    <div key={option.value} className="flex items-center">
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="flex-1 min-w-0 ml-3 text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center text-sm font-medium text-gray-700 group hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <a onClick={ () => filterSorting(option.sort) }
                                className={classNames(
                                  option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                {option.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button type="button" className="p-2 ml-5 -m-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="p-2 ml-4 -m-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block">
                  

                  {filters.map((section) => (
                    <Disclosure as="div" key={section.id} className="py-6 border-b border-gray-200">
                      {({ open }) => (
                        <>
                          <h3 className="flow-root -my-3">
                            <Disclosure.Button className="flex items-center justify-between w-full py-3 text-sm text-gray-400 bg-white hover:text-gray-500">
                              <span className="font-medium text-gray-900">{section.name}</span>
                              <span className="flex items-center ml-6">
                                {open ? (
                                  <MinusIcon className="w-5 h-5" aria-hidden="true" />
                                ) : (
                                  <PlusIcon className="w-5 h-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {categories.map((option, optionIdx) => (
                                <div key={option} className="flex items-center">
                                  <input
                                    id={`filter-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option}
                                    type="radio" onClick={() => filterCategoryName(option) }
                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600 capitalize"
                                  >
                                    {option}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>

                {/* Product grid */}
                <div className="lg:col-span-3">
                  <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                  {
                    loading ?
                      <>
                        <Loading/><Loading/><Loading/><Loading/><Loading/><Loading/><Loading/><Loading/>
                      </>
                    : 
                      <Product products={products}/>
                      
                  }
                </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  )
}
