import { Industry, UseCase } from '../types';

export const industries: Record<Industry, { name: string; icon: string; useCases: UseCase[] }> = {
  banking: {
    name: 'Banking',
    icon: 'Building',
    useCases: [
      {
        id: 'loan-processing',
        name: 'Loan Processing',
        description: 'Process loan applications and agreements',
        templates: [
          {
            id: 'loan-application',
            name: 'Loan Application',
            description: 'Standard loan application form',
            compliance: ['GDPR', 'KYC', 'AML'],
            fields: [
              { id: 'borrower_name', label: 'Borrower Name', type: 'text', required: true },
              { id: 'loan_amount', label: 'Loan Amount', type: 'number', required: true },
              { id: 'loan_purpose', label: 'Loan Purpose', type: 'select', required: true, options: ['Personal', 'Business', 'Home', 'Auto'] },
              { id: 'employment_status', label: 'Employment Status', type: 'select', required: true, options: ['Employed', 'Self-Employed', 'Retired'] },
              { id: 'annual_income', label: 'Annual Income', type: 'number', required: true },
              { id: 'email', label: 'Email', type: 'email', required: true },
              { id: 'phone', label: 'Phone Number', type: 'text', required: true },
              { id: 'signature', label: 'Applicant Signature', type: 'signature', required: true },
              { id: 'date', label: 'Date', type: 'date', required: true },
            ],
          },
          {
            id: 'loan-agreement',
            name: 'Loan Agreement',
            description: 'Formal loan agreement contract',
            compliance: ['GDPR', 'eIDAS'],
            fields: [
              { id: 'lender_name', label: 'Lender Name', type: 'text', required: true },
              { id: 'borrower_name', label: 'Borrower Name', type: 'text', required: true },
              { id: 'loan_amount', label: 'Principal Amount', type: 'number', required: true },
              { id: 'interest_rate', label: 'Interest Rate (%)', type: 'number', required: true },
              { id: 'loan_term', label: 'Loan Term (months)', type: 'number', required: true },
              { id: 'repayment_date', label: 'First Repayment Date', type: 'date', required: true },
              { id: 'borrower_signature', label: 'Borrower Signature', type: 'signature', required: true },
              { id: 'lender_signature', label: 'Lender Signature', type: 'signature', required: true },
              { id: 'witness_signature', label: 'Witness Signature', type: 'signature', required: false },
              { id: 'agreement_date', label: 'Agreement Date', type: 'date', required: true },
            ],
          },
        ],
      },
      {
        id: 'account-opening',
        name: 'Account Opening',
        description: 'New account applications and KYC forms',
        templates: [
          {
            id: 'account-application',
            name: 'Account Application',
            description: 'New bank account application',
            compliance: ['KYC', 'AML', 'GDPR'],
            fields: [
              { id: 'account_type', label: 'Account Type', type: 'select', required: true, options: ['Savings', 'Checking', 'Business'] },
              { id: 'full_name', label: 'Full Name', type: 'text', required: true },
              { id: 'date_of_birth', label: 'Date of Birth', type: 'date', required: true },
              { id: 'ssn', label: 'Social Security Number', type: 'text', required: true },
              { id: 'address', label: 'Address', type: 'text', required: true },
              { id: 'email', label: 'Email', type: 'email', required: true },
              { id: 'phone', label: 'Phone', type: 'text', required: true },
              { id: 'initial_deposit', label: 'Initial Deposit Amount', type: 'number', required: true },
              { id: 'signature', label: 'Signature', type: 'signature', required: true },
            ],
          },
        ],
      },
    ],
  },
  insurance: {
    name: 'Insurance',
    icon: 'Shield',
    useCases: [
      {
        id: 'policy-management',
        name: 'Policy Management',
        description: 'Insurance policies and contracts',
        templates: [
          {
            id: 'policy-application',
            name: 'Policy Application',
            description: 'Insurance policy application form',
            compliance: ['GDPR', 'HIPAA'],
            fields: [
              { id: 'policy_type', label: 'Policy Type', type: 'select', required: true, options: ['Life', 'Health', 'Auto', 'Home'] },
              { id: 'applicant_name', label: 'Applicant Name', type: 'text', required: true },
              { id: 'date_of_birth', label: 'Date of Birth', type: 'date', required: true },
              { id: 'coverage_amount', label: 'Coverage Amount', type: 'number', required: true },
              { id: 'beneficiary_name', label: 'Beneficiary Name', type: 'text', required: true },
              { id: 'medical_conditions', label: 'Pre-existing Conditions', type: 'checkbox', required: false },
              { id: 'signature', label: 'Applicant Signature', type: 'signature', required: true },
              { id: 'date', label: 'Date', type: 'date', required: true },
            ],
          },
        ],
      },
      {
        id: 'claims-processing',
        name: 'Claims Processing',
        description: 'Insurance claim forms and settlements',
        templates: [
          {
            id: 'claim-form',
            name: 'Claim Form',
            description: 'Insurance claim submission form',
            compliance: ['GDPR'],
            fields: [
              { id: 'policy_number', label: 'Policy Number', type: 'text', required: true },
              { id: 'claimant_name', label: 'Claimant Name', type: 'text', required: true },
              { id: 'incident_date', label: 'Date of Incident', type: 'date', required: true },
              { id: 'incident_description', label: 'Description', type: 'text', required: true },
              { id: 'claim_amount', label: 'Claim Amount', type: 'number', required: true },
              { id: 'signature', label: 'Claimant Signature', type: 'signature', required: true },
            ],
          },
        ],
      },
    ],
  },
  healthcare: {
    name: 'Healthcare',
    icon: 'Heart',
    useCases: [
      {
        id: 'patient-consent',
        name: 'Patient Consent',
        description: 'Medical consent and authorization forms',
        templates: [
          {
            id: 'treatment-consent',
            name: 'Treatment Consent',
            description: 'General treatment consent form',
            compliance: ['HIPAA', 'GDPR'],
            fields: [
              { id: 'patient_name', label: 'Patient Name', type: 'text', required: true },
              { id: 'date_of_birth', label: 'Date of Birth', type: 'date', required: true },
              { id: 'procedure', label: 'Procedure/Treatment', type: 'text', required: true },
              { id: 'physician_name', label: 'Physician Name', type: 'text', required: true },
              { id: 'risks_understood', label: 'I understand the risks', type: 'checkbox', required: true },
              { id: 'patient_signature', label: 'Patient Signature', type: 'signature', required: true },
              { id: 'guardian_signature', label: 'Guardian Signature (if minor)', type: 'signature', required: false },
              { id: 'date', label: 'Date', type: 'date', required: true },
            ],
          },
          {
            id: 'hipaa-authorization',
            name: 'HIPAA Authorization',
            description: 'Authorization for release of medical information',
            compliance: ['HIPAA'],
            fields: [
              { id: 'patient_name', label: 'Patient Name', type: 'text', required: true },
              { id: 'release_to', label: 'Release Information To', type: 'text', required: true },
              { id: 'information_type', label: 'Type of Information', type: 'select', required: true, options: ['Medical Records', 'Lab Results', 'Imaging', 'All Records'] },
              { id: 'purpose', label: 'Purpose of Release', type: 'text', required: true },
              { id: 'expiration_date', label: 'Authorization Expires', type: 'date', required: true },
              { id: 'signature', label: 'Patient Signature', type: 'signature', required: true },
            ],
          },
        ],
      },
    ],
  },
  manufacturing: {
    name: 'Manufacturing',
    icon: 'Factory',
    useCases: [
      {
        id: 'supplier-management',
        name: 'Supplier Management',
        description: 'Supplier agreements and vendor forms',
        templates: [
          {
            id: 'supplier-agreement',
            name: 'Supplier Agreement',
            description: 'Standard supplier contract',
            compliance: ['ISO 9001'],
            fields: [
              { id: 'supplier_name', label: 'Supplier Name', type: 'text', required: true },
              { id: 'company_name', label: 'Company Name', type: 'text', required: true },
              { id: 'supply_items', label: 'Items/Services', type: 'text', required: true },
              { id: 'payment_terms', label: 'Payment Terms', type: 'select', required: true, options: ['Net 30', 'Net 45', 'Net 60', 'COD'] },
              { id: 'delivery_schedule', label: 'Delivery Schedule', type: 'text', required: true },
              { id: 'quality_standards', label: 'Quality Standards Agreed', type: 'checkbox', required: true },
              { id: 'supplier_signature', label: 'Supplier Signature', type: 'signature', required: true },
              { id: 'company_signature', label: 'Company Signature', type: 'signature', required: true },
            ],
          },
        ],
      },
      {
        id: 'quality-control',
        name: 'Quality Control',
        description: 'QC forms and compliance documents',
        templates: [
          {
            id: 'qc-checklist',
            name: 'Quality Control Checklist',
            description: 'Product quality inspection form',
            compliance: ['ISO 9001'],
            fields: [
              { id: 'product_id', label: 'Product ID', type: 'text', required: true },
              { id: 'batch_number', label: 'Batch Number', type: 'text', required: true },
              { id: 'inspection_date', label: 'Inspection Date', type: 'date', required: true },
              { id: 'visual_inspection', label: 'Visual Inspection Pass', type: 'checkbox', required: true },
              { id: 'dimension_check', label: 'Dimensions Within Spec', type: 'checkbox', required: true },
              { id: 'functionality_test', label: 'Functionality Test Pass', type: 'checkbox', required: true },
              { id: 'inspector_name', label: 'Inspector Name', type: 'text', required: true },
              { id: 'inspector_signature', label: 'Inspector Signature', type: 'signature', required: true },
            ],
          },
        ],
      },
    ],
  },
  'real-estate': {
    name: 'Real Estate',
    icon: 'Home',
    useCases: [
      {
        id: 'sales-transactions',
        name: 'Sales Transactions',
        description: 'Purchase agreements and sales contracts',
        templates: [
          {
            id: 'purchase-agreement',
            name: 'Purchase Agreement',
            description: 'Real estate purchase agreement',
            compliance: ['eIDAS'],
            fields: [
              { id: 'property_address', label: 'Property Address', type: 'text', required: true },
              { id: 'purchase_price', label: 'Purchase Price', type: 'number', required: true },
              { id: 'earnest_money', label: 'Earnest Money Deposit', type: 'number', required: true },
              { id: 'closing_date', label: 'Closing Date', type: 'date', required: true },
              { id: 'buyer_name', label: 'Buyer Name', type: 'text', required: true },
              { id: 'seller_name', label: 'Seller Name', type: 'text', required: true },
              { id: 'buyer_signature', label: 'Buyer Signature', type: 'signature', required: true },
              { id: 'seller_signature', label: 'Seller Signature', type: 'signature', required: true },
              { id: 'agent_signature', label: 'Agent Signature', type: 'signature', required: false },
            ],
          },
        ],
      },
      {
        id: 'property-management',
        name: 'Property Management',
        description: 'Lease agreements and rental contracts',
        templates: [
          {
            id: 'lease-agreement',
            name: 'Lease Agreement',
            description: 'Residential lease agreement',
            compliance: ['GDPR'],
            fields: [
              { id: 'property_address', label: 'Property Address', type: 'text', required: true },
              { id: 'monthly_rent', label: 'Monthly Rent', type: 'number', required: true },
              { id: 'security_deposit', label: 'Security Deposit', type: 'number', required: true },
              { id: 'lease_start', label: 'Lease Start Date', type: 'date', required: true },
              { id: 'lease_end', label: 'Lease End Date', type: 'date', required: true },
              { id: 'tenant_name', label: 'Tenant Name', type: 'text', required: true },
              { id: 'landlord_name', label: 'Landlord Name', type: 'text', required: true },
              { id: 'tenant_signature', label: 'Tenant Signature', type: 'signature', required: true },
              { id: 'landlord_signature', label: 'Landlord Signature', type: 'signature', required: true },
            ],
          },
        ],
      },
    ],
  },
  education: {
    name: 'Education',
    icon: 'GraduationCap',
    useCases: [
      {
        id: 'student-enrollment',
        name: 'Student Enrollment',
        description: 'Enrollment and admission forms',
        templates: [
          {
            id: 'enrollment-form',
            name: 'Enrollment Form',
            description: 'Student enrollment application',
            compliance: ['FERPA', 'GDPR'],
            fields: [
              { id: 'student_name', label: 'Student Name', type: 'text', required: true },
              { id: 'date_of_birth', label: 'Date of Birth', type: 'date', required: true },
              { id: 'grade_level', label: 'Grade Level', type: 'select', required: true, options: ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] },
              { id: 'parent_name', label: 'Parent/Guardian Name', type: 'text', required: true },
              { id: 'emergency_contact', label: 'Emergency Contact', type: 'text', required: true },
              { id: 'medical_conditions', label: 'Medical Conditions', type: 'text', required: false },
              { id: 'parent_signature', label: 'Parent Signature', type: 'signature', required: true },
              { id: 'date', label: 'Date', type: 'date', required: true },
            ],
          },
        ],
      },
    ],
  },
  government: {
    name: 'Government',
    icon: 'Building2',
    useCases: [
      {
        id: 'citizen-services',
        name: 'Citizen Services',
        description: 'Government service applications',
        templates: [
          {
            id: 'permit-application',
            name: 'Permit Application',
            description: 'General permit application form',
            compliance: ['eIDAS', 'GDPR'],
            fields: [
              { id: 'permit_type', label: 'Permit Type', type: 'select', required: true, options: ['Building', 'Business', 'Event', 'Parking'] },
              { id: 'applicant_name', label: 'Applicant Name', type: 'text', required: true },
              { id: 'address', label: 'Address', type: 'text', required: true },
              { id: 'purpose', label: 'Purpose/Description', type: 'text', required: true },
              { id: 'start_date', label: 'Start Date', type: 'date', required: true },
              { id: 'end_date', label: 'End Date', type: 'date', required: true },
              { id: 'signature', label: 'Applicant Signature', type: 'signature', required: true },
            ],
          },
        ],
      },
    ],
  },
  retail: {
    name: 'Retail',
    icon: 'ShoppingCart',
    useCases: [
      {
        id: 'vendor-agreements',
        name: 'Vendor Agreements',
        description: 'Supplier and vendor contracts',
        templates: [
          {
            id: 'vendor-contract',
            name: 'Vendor Contract',
            description: 'Retail vendor agreement',
            compliance: ['GDPR'],
            fields: [
              { id: 'vendor_name', label: 'Vendor Name', type: 'text', required: true },
              { id: 'product_category', label: 'Product Category', type: 'text', required: true },
              { id: 'commission_rate', label: 'Commission Rate (%)', type: 'number', required: true },
              { id: 'payment_terms', label: 'Payment Terms', type: 'select', required: true, options: ['Net 15', 'Net 30', 'Net 45'] },
              { id: 'contract_duration', label: 'Contract Duration (months)', type: 'number', required: true },
              { id: 'vendor_signature', label: 'Vendor Signature', type: 'signature', required: true },
              { id: 'retailer_signature', label: 'Retailer Signature', type: 'signature', required: true },
            ],
          },
        ],
      },
    ],
  },
  hospitality: {
    name: 'Hospitality',
    icon: 'Hotel',
    useCases: [
      {
        id: 'guest-services',
        name: 'Guest Services',
        description: 'Guest registration and agreements',
        templates: [
          {
            id: 'guest-registration',
            name: 'Guest Registration',
            description: 'Hotel guest registration form',
            compliance: ['GDPR'],
            fields: [
              { id: 'guest_name', label: 'Guest Name', type: 'text', required: true },
              { id: 'check_in_date', label: 'Check-in Date', type: 'date', required: true },
              { id: 'check_out_date', label: 'Check-out Date', type: 'date', required: true },
              { id: 'room_type', label: 'Room Type', type: 'select', required: true, options: ['Single', 'Double', 'Suite', 'Deluxe'] },
              { id: 'payment_method', label: 'Payment Method', type: 'select', required: true, options: ['Credit Card', 'Cash', 'Corporate'] },
              { id: 'signature', label: 'Guest Signature', type: 'signature', required: true },
            ],
          },
        ],
      },
    ],
  },
};