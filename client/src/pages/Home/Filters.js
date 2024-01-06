import { Checkbox, Form, Modal } from "antd";
import React, { useEffect, useRef } from "react";
import { getDefaultLocale } from "react-datepicker";

const categories = [
  { name: "Electronics", value: "electronics" },
  {
    name: "Home",
    value: "home",
  },
  {
    name: "Fashion",
    value: "fashion",
  },
  {
    name: "Sports",
    value: "sports",
  },
  {
    name: "Books",
    value: "books",
  },
];

const ages = [
  { name: "0-2 years old", value: "0-2" },
  {
    name: "3-5 years old",
    value: "3-5",
  },
  {
    name: "6-8 years old",
    value: "6-8",
  },
  {
    name: "9-12 years old",
    value: "9-12",
  },
  {
    name: "13+ years old",
    value: "12-20",
  },
];

function Filters({
  showFilters,
  setShowFilters,
  filters,
  setFilters,
  getData,
}) {
  useEffect(() => {
    getData();
  }, [filters]);

  return (
    <Modal
      open={showFilters}
      footer={null}
      onCancel={() => setShowFilters(false)}
      width={500}
    >
      <Form>
        <div className=" p-4 flex-col bg-white z-777777">
          <div className="flex justify-between">
            <h1 className="text-orange-900 text-xl">Filters</h1>
            {/* <i
            className="ri-close-line cursor-pointer text-xl"
            onClick={() => setShowFilters(false)}
          ></i> */}
          </div>
          <div className="flex flex-col gap-1 mt-5">
            <h1 className="text-gray-500 mb-1">Categories</h1>
            <div className="flex flex-col gap-3 justify-center">
              {categories.map((category) => {
                return (
                  <Checkbox
                    name="category"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters({
                          ...filters,
                          category: [...filters.category, category.value],
                        });
                      } else {
                        setFilters({
                          ...filters,
                          category: filters.category.filter(
                            (item) => item !== category.value
                          ),
                        });
                      }
                    }}
                  >
                    {category.name}
                  </Checkbox>
                );
              })}
            </div>
          </div>
          <h1 className="text-gray-500 mt-3 mb-2">Ages</h1>
          <div className="flex flex-col gap-3 justify-center">
            {ages.map((age) => {
              return (
                <Checkbox
                  name="age"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        age: [...filters.age, age.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        age: filters.age.filter((item) => item !== age.value),
                      });
                    }
                  }}
                >
                  {age.name}
                </Checkbox>
              );
            })}
          </div>
        </div>
      </Form>
    </Modal>
  );
}

export default Filters;
