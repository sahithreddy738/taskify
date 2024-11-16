import { OrganizationList } from "@clerk/nextjs";


const SelectOrganizationPage = () => {
  return (
    <div>
      <OrganizationList
        hidePersonal
        afterCreateOrganizationUrl={"/organization/:id"}
        afterSelectOrganizationUrl={"/organization/:id"}
      />
    </div>
  );
};

export default SelectOrganizationPage;
