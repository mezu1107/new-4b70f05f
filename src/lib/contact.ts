// Centralized contact details — single source of truth for the whole site
export const CONTACT = {
  phones: [
    { label: "Pakistan (Primary)", display: "+92 317 3712950", tel: "+923173712950", wa: "923173712950" },
    { label: "UK", display: "+44 7717 229638", tel: "+447717229638", wa: "447717229638" },
    { label: "Pakistan (Secondary)", display: "+92 370 9447916", tel: "+923709447916", wa: "923709447916" },
  ],
  emails: [
    "info@amenterprises.tech",
    "contactamenterprises.tech@gmail.com",
    "amenterprises1105@gmail.com",
  ],
  offices: [
    { name: "Main HQ — Islamabad", address: "Islamabad, Pakistan" },
    { name: "Rawat Technology Park", address: "Rawat, Rawalpindi, Pakistan" },
    { name: "Sixth Road Office", address: "Sixth Road, Rawalpindi, Pakistan" },
  ],
};

export const PRIMARY_PHONE = CONTACT.phones[0];
export const PRIMARY_EMAIL = CONTACT.emails[0];
