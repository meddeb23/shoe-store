import React from "react";
import { NavLink } from "react-router-dom";
import SectionTitle from "../section header/SectionTitle";
import motif from "../../images/motif-2.svg";
import item1 from "../../images/item-1.jpg";
import item2 from "../../images/item-13.jpg";
import item3 from "../../images/item-15.jpg";

export default function CollectionsBanner() {
  return (
    <section className="collections">
      <SectionTitle title={"Collections"} />
      <div className="container m-auto lg:w-8/12">
        <div className="grid md:grid-cols-2">
          <div className="relative">
            <div className="bg-black opacity-50 p-6 flex flex-col justify-between absolute top-0 left-0 w-full h-full">
              <h1 className="font-bold text-xl text-white">Friendly</h1>
              <NavLink to="/">
                <div className="mr-0 ml-auto rounded-md bg-blue-700 p-2 text-white font-bold opacity-100 w-32 text-center">
                  Explore
                </div>
              </NavLink>
            </div>
            <img src={item1} className="object-cover w-full h-60" />
          </div>

          <div className="relative">
            <div className="bg-black opacity-50 p-6 flex flex-col justify-between absolute top-0 left-0 w-full h-full">
              <h1 className="font-bold text-xl text-white">Sports</h1>
              <NavLink to="/">
                <div className="mr-0 ml-auto rounded-md bg-blue-700 p-2 text-white font-bold opacity-100 w-32 text-center">
                  Explore
                </div>
              </NavLink>
            </div>
            <img src={item2} className="object-cover w-full h-60" />
          </div>
        </div>

        <div className="relative">
          <div className="bg-black opacity-50 p-6 flex flex-col justify-between absolute top-0 left-0 w-full h-full">
            <h1 className="font-bold text-xl text-white">Classic</h1>
            <NavLink to="/">
              <div className="mr-0 ml-auto rounded-md bg-blue-700 p-2 text-white font-bold opacity-100 w-32 text-center">
                Explore
              </div>
            </NavLink>
          </div>
          <img src={item3} className="object-cover w-full h-60" />
        </div>
      </div>
    </section>
  );
}
