-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2017-10-03 09:30:21.9

-- tables
-- Table: anamnesis
CREATE TABLE anamnesis (
    anamnesis_id int  NOT NULL,
    user_anamnesis_id int  NOT NULL,
    notes varchar(1024)  NULL,
    CONSTRAINT anamnesis_pk PRIMARY KEY (anamnesis_id)
);

-- Table: anamnesis_catalog
CREATE TABLE anamnesis_catalog (
    id int  NOT NULL,
    catalog_name varchar(256)  NOT NULL,
    anamnesis_type_id int  NOT NULL,
    CONSTRAINT anamnesis_catalog_pk PRIMARY KEY (id)
);

-- Table: anamnesis_type
CREATE TABLE anamnesis_type (
    id int  NOT NULL,
    type_name varchar(128)  NOT NULL,
    CONSTRAINT anamnesis_type_pk PRIMARY KEY (id)
);

-- Table: document
CREATE TABLE document (
    id int  NOT NULL,
    description varchar(1024)  NOT NULL,
    location varchar(1024)  NOT NULL,
    patient_id int  NOT NULL,
    CONSTRAINT document_pk PRIMARY KEY (id)
);

-- Table: patient
CREATE TABLE patient (
    id int  NOT NULL,
    name varchar(128)  NOT NULL,
    surname varchar(128)  NOT NULL,
    identification_number varchar(64)  NOT NULL,
    address varchar(256)  NOT NULL,
    phone varchar(32)  NOT NULL,
    mail varchar(256)  NULL,
    CONSTRAINT patient_pk PRIMARY KEY (id)
);

-- Table: problem_catalog
CREATE TABLE problem_catalog (
    id int  NOT NULL,
    problem_name varchar(256)  NOT NULL,
    CONSTRAINT problem_catalog_pk PRIMARY KEY (id)
);

-- Table: problem_detected
CREATE TABLE problem_detected (
    id int  NOT NULL,
    tooth_id int  NULL,
    problem_catalog_id int  NOT NULL,
    visit_id int  NOT NULL,
    suggested_treatment_id int  NULL,
    selected_treatment_id int  NULL,
    CONSTRAINT problem_detected_ak_1 UNIQUE (tooth_id, problem_catalog_id, visit_id) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT problem_detected_pk PRIMARY KEY (id)
);

-- Table: role
CREATE TABLE role (
    id int  NOT NULL,
    role_name varchar(100)  NOT NULL,
    CONSTRAINT role_pk PRIMARY KEY (id)
);

-- Table: status
CREATE TABLE status (
    id int  NOT NULL,
    status_name varchar(100)  NOT NULL,
    is_user_working bool  NOT NULL,
    CONSTRAINT status_pk PRIMARY KEY (id)
);

-- Table: step
CREATE TABLE step (
    id int  NOT NULL,
    step_name varchar(256)  NOT NULL,
    description varchar(1024)  NOT NULL,
    CONSTRAINT step_pk PRIMARY KEY (id)
);

-- Table: tooth
CREATE TABLE tooth (
    id int  NOT NULL,
    is_baby_tooth bool  NOT NULL,
    tooth varchar(32)  NOT NULL,
    CONSTRAINT tooth_pk PRIMARY KEY (id)
);

-- Table: treatment
CREATE TABLE treatment (
    id int  NOT NULL,
    treatment_name varchar(256)  NOT NULL,
    description varchar(1024)  NOT NULL,
    final_step_id int  NOT NULL,
    CONSTRAINT treatment_pk PRIMARY KEY (id)
);

-- Table: treatment_steps
CREATE TABLE treatment_steps (
    id int  NOT NULL,
    treatment_id int  NOT NULL,
    step_id int  NOT NULL,
    step_order int  NOT NULL,
    CONSTRAINT treatment_steps_ak_1 UNIQUE (treatment_id, step_id) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT treatment_steps_ak_2 UNIQUE (treatment_id, step_order) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT treatment_steps_pk PRIMARY KEY (id)
);

-- Table: user_account
CREATE TABLE user_account (
    id int  NOT NULL,
    user_name varchar(100)  NOT NULL,
    email varchar(254)  NOT NULL,
    password varchar(200)  NOT NULL,
    password_salt varchar(50)  NULL,
    password_hash_algorithm varchar(50)  NOT NULL,
    CONSTRAINT user_account_pk PRIMARY KEY (id)
);

-- Table: user_has_role
CREATE TABLE user_has_role (
    id int  NOT NULL,
    role_start_time timestamp  NOT NULL,
    role_end_time timestamp  NULL,
    user_account_id int  NOT NULL,
    role_id int  NOT NULL,
    CONSTRAINT user_has_role_ak_1 UNIQUE (role_start_time, role_id, user_account_id) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT user_has_role_pk PRIMARY KEY (id)
);

-- Table: user_has_status
CREATE TABLE user_has_status (
    id int  NOT NULL,
    status_start_time timestamp  NOT NULL,
    status_end_time timestamp  NULL,
    user_account_id int  NOT NULL,
    status_id int  NOT NULL,
    CONSTRAINT user_has_status_ak_1 UNIQUE (status_start_time, user_account_id) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT user_has_status_pk PRIMARY KEY (id)
);

-- Table: visit
CREATE TABLE visit (
    id int  NOT NULL,
    visit_date timestamp  NOT NULL,
    patient_id int  NOT NULL,
    dentist_id int  NOT NULL,
    CONSTRAINT visit_pk PRIMARY KEY (id)
);

-- Table: visit_anamnesis
CREATE TABLE visit_anamnesis (
    anamnesis_anamnesis_id int  NOT NULL,
    anamnesis_catalog_id int  NOT NULL,
    CONSTRAINT visit_anamnesis_pk PRIMARY KEY (anamnesis_anamnesis_id,anamnesis_catalog_id)
);

-- Table: visit_status
CREATE TABLE visit_status (
    id int  NOT NULL,
    status_name varchar(256)  NOT NULL,
    CONSTRAINT visit_status_pk PRIMARY KEY (id)
);

-- Table: visit_status_history
CREATE TABLE visit_status_history (
    id int  NOT NULL,
    status_time timestamp  NOT NULL,
    visit_status_id int  NOT NULL,
    visit_id int  NOT NULL,
    CONSTRAINT visit_status_history_pk PRIMARY KEY (id)
);

-- Table: visit_steps
CREATE TABLE visit_steps (
    id int  NOT NULL,
    visit_id int  NOT NULL,
    treatment_steps_id int  NOT NULL,
    problem_detected_id int  NULL,
    step_time timestamp  NOT NULL,
    notes varchar(512)  NULL,
    CONSTRAINT visit_steps_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: anamnesis_catalog_anamnesis_type (table: anamnesis_catalog)
ALTER TABLE anamnesis_catalog ADD CONSTRAINT anamnesis_catalog_anamnesis_type
    FOREIGN KEY (anamnesis_type_id)
    REFERENCES anamnesis_type (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: anamnesis_user_has_role (table: anamnesis)
ALTER TABLE anamnesis ADD CONSTRAINT anamnesis_user_has_role
    FOREIGN KEY (user_anamnesis_id)
    REFERENCES user_has_role (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: anamnesis_visit (table: anamnesis)
ALTER TABLE anamnesis ADD CONSTRAINT anamnesis_visit
    FOREIGN KEY (anamnesis_id)
    REFERENCES visit (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: document_patient (table: document)
ALTER TABLE document ADD CONSTRAINT document_patient
    FOREIGN KEY (patient_id)
    REFERENCES patient (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: problem_detected_problem_catalog (table: problem_detected)
ALTER TABLE problem_detected ADD CONSTRAINT problem_detected_problem_catalog
    FOREIGN KEY (problem_catalog_id)
    REFERENCES problem_catalog (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: problem_detected_tooth (table: problem_detected)
ALTER TABLE problem_detected ADD CONSTRAINT problem_detected_tooth
    FOREIGN KEY (tooth_id)
    REFERENCES tooth (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: problem_detected_treatment_selected (table: problem_detected)
ALTER TABLE problem_detected ADD CONSTRAINT problem_detected_treatment_selected
    FOREIGN KEY (selected_treatment_id)
    REFERENCES treatment (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: problem_detected_treatment_suggested (table: problem_detected)
ALTER TABLE problem_detected ADD CONSTRAINT problem_detected_treatment_suggested
    FOREIGN KEY (suggested_treatment_id)
    REFERENCES treatment (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: problem_detected_visit (table: problem_detected)
ALTER TABLE problem_detected ADD CONSTRAINT problem_detected_visit
    FOREIGN KEY (visit_id)
    REFERENCES visit (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: treatment_step (table: treatment)
ALTER TABLE treatment ADD CONSTRAINT treatment_step
    FOREIGN KEY (final_step_id)
    REFERENCES step (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: treatment_steps_step (table: treatment_steps)
ALTER TABLE treatment_steps ADD CONSTRAINT treatment_steps_step
    FOREIGN KEY (step_id)
    REFERENCES step (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: treatment_steps_treatment (table: treatment_steps)
ALTER TABLE treatment_steps ADD CONSTRAINT treatment_steps_treatment
    FOREIGN KEY (treatment_id)
    REFERENCES treatment (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: user_has_role_role (table: user_has_role)
ALTER TABLE user_has_role ADD CONSTRAINT user_has_role_role
    FOREIGN KEY (role_id)
    REFERENCES role (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: user_has_role_user_account (table: user_has_role)
ALTER TABLE user_has_role ADD CONSTRAINT user_has_role_user_account
    FOREIGN KEY (user_account_id)
    REFERENCES user_account (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: user_has_status_status (table: user_has_status)
ALTER TABLE user_has_status ADD CONSTRAINT user_has_status_status
    FOREIGN KEY (status_id)
    REFERENCES status (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: user_has_status_user_account (table: user_has_status)
ALTER TABLE user_has_status ADD CONSTRAINT user_has_status_user_account
    FOREIGN KEY (user_account_id)
    REFERENCES user_account (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: visit_anamnesis_anamnesis (table: visit_anamnesis)
ALTER TABLE visit_anamnesis ADD CONSTRAINT visit_anamnesis_anamnesis
    FOREIGN KEY (anamnesis_anamnesis_id)
    REFERENCES anamnesis (anamnesis_id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: visit_anamnesis_anamnesis_catalog (table: visit_anamnesis)
ALTER TABLE visit_anamnesis ADD CONSTRAINT visit_anamnesis_anamnesis_catalog
    FOREIGN KEY (anamnesis_catalog_id)
    REFERENCES anamnesis_catalog (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: visit_patient (table: visit)
ALTER TABLE visit ADD CONSTRAINT visit_patient
    FOREIGN KEY (patient_id)
    REFERENCES patient (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: visit_status_history_visit (table: visit_status_history)
ALTER TABLE visit_status_history ADD CONSTRAINT visit_status_history_visit
    FOREIGN KEY (visit_id)
    REFERENCES visit (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: visit_status_history_visit_status (table: visit_status_history)
ALTER TABLE visit_status_history ADD CONSTRAINT visit_status_history_visit_status
    FOREIGN KEY (visit_status_id)
    REFERENCES visit_status (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: visit_steps_problem_detected (table: visit_steps)
ALTER TABLE visit_steps ADD CONSTRAINT visit_steps_problem_detected
    FOREIGN KEY (problem_detected_id)
    REFERENCES problem_detected (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: visit_steps_treatment_steps (table: visit_steps)
ALTER TABLE visit_steps ADD CONSTRAINT visit_steps_treatment_steps
    FOREIGN KEY (treatment_steps_id)
    REFERENCES treatment_steps (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: visit_steps_visit (table: visit_steps)
ALTER TABLE visit_steps ADD CONSTRAINT visit_steps_visit
    FOREIGN KEY (visit_id)
    REFERENCES visit (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: visit_user_has_role (table: visit)
ALTER TABLE visit ADD CONSTRAINT visit_user_has_role
    FOREIGN KEY (dentist_id)
    REFERENCES user_has_role (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

