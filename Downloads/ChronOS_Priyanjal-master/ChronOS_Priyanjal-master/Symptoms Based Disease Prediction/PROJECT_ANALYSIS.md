# Disease Prediction Web Application - Detailed Project Analysis

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture Overview](#architecture-overview)
3. [Data Flow Diagrams](#data-flow-diagrams)
4. [System Components](#system-components)
5. [Data Structures](#data-structures)
6. [User Workflows](#user-workflows)

---

## 📌 Project Overview

### Purpose
A **Flask-based web application** that predicts diseases from patient symptoms using a pre-trained machine learning model (RandomForest classifier). The app manages user accounts, stores prediction history, and provides a dashboard for users to track their medical predictions.

### Technology Stack
| Component | Technology |
|-----------|-----------|
| **Backend Framework** | Flask 3.0.3 |
| **Database** | SQLite (instance/app.db) |
| **ORM** | SQLAlchemy 2.0.30 |
| **ML Framework** | Scikit-learn 1.4.2 |
| **Feature Engineering** | Pandas 2.2.2, NumPy 1.26.4 |
| **Web Server** | Werkzeug 3.0.3 |
| **Session Management** | Flask sessions (server-side) |
| **Password Security** | Werkzeug password hashing |

### Key Features
✅ User registration & authentication (email-based)  
✅ Disease prediction from multi-symptom input  
✅ ML confidence scoring  
✅ Per-user prediction history dashboard  
✅ Responsive medical-themed UI  
✅ 30 disease classes supported  

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER INTERFACE LAYER                         │
│              (Browser / Jinja2 Templates)                       │
│  ┌───────────┬──────────────┬────────────┬──────────────────┐  │
│  │  home.html│ register.html│ login.html │ predict.html     │  │
│  │ result.html            dashboard.html │ base.html        │  │
│  └───────────┴──────────────┴────────────┴──────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                            │
│                       (Flask Routes)                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ app.py - 309 lines                                       │  │
│  │  Routes: /, /register, /login, /logout, /predict,       │  │
│  │          /submit_prediction, /dashboard, /api            │  │
│  │  Session Management & Request Validation                │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
         ▼                           ▼                    ▼
    ┌─────────┐         ┌──────────────────┐      ┌──────────┐
    │ DATABASE│         │   ML PIPELINE    │      │ VALIDATION│
    │ LAYER   │         │     LAYER        │      │  LAYER    │
    └─────────┘         └──────────────────┘      └──────────┘
        │                      │                       │
        ▼                      ▼                       ▼
    ┌──────────┐      ┌────────────────┐      ┌─────────────┐
    │ SQLAlch- │      │  Preprocessing │      │  Symptom    │
    │  emy ORM │      │   (TF-IDF,     │      │  Validation │
    │          │      │    OneHot      │      │             │
    │ database.│      │   Encoding)    │      │ preprocess.py│
    │   py     │      │                │      └─────────────┘
    └──────────┘      │  RandomForest  │
         │            │   Classifier   │
         ▼            │                │
    ┌────────────┐    │  model.pkl     │
    │SQLite DB   │    │  vectorizer.pk │
    │(app.db)    │    │  encoders.pkl  │
    └────────────┘    └────────────────┘
                             ▲
                             │
                      ┌──────────────┐
                      │ train_model  │
                      │    .py       │
                      │ (Generates   │
                      │ dataset.csv) │
                      └──────────────┘
```

---

## 📊 Data Flow Diagrams

### DFD Level 0: System Context Diagram

```
                    ┌─────────────┐
                    │   END USER  │
                    │  (Browser)  │
                    └──────┬──────┘
                           │
                ┌──────────┼──────────┐
                │          │          │
                ▼          ▼          ▼
           ┌────────────────────────┐
           │   DISEASE PREDICTION   │
           │    WEB APPLICATION     │
           │                        │
           │   (Flask + SQLAlchemy  │
           │    + Scikit-learn)     │
           │                        │
           └───────────┬────────────┘
                       │
            ┌──────────┼──────────┐
            │          │          │
            ▼          ▼          ▼
       ┌────────┐ ┌────────┐ ┌─────────┐
       │ SQLite │ │   ML   │ │ Static  │
       │   DB   │ │ Models │ │ Assets  │
       │        │ │  .pkl  │ │(CSS/JS) │
       └────────┘ └────────┘ └─────────┘
```

### DFD Level 1: Main Processes

```
                          ┌──────────────┐
                          │   END USER   │
                          │  (Browser)   │
                          └────────┬─────┘
                                   │
                   ┌───────────────┼───────────────┐
                   │               │               │
                   ▼               ▼               ▼
            ┌─────────────┐ ┌─────────────┐ ┌──────────────┐
            │  P1: Auth   │ │  P2: Input  │ │  P3: Predict │
            │ Management  │ │ Validation  │ │  Disease     │
            │             │ │             │ │              │
            │ Register    │ │ Clean       │ │ Preprocess   │
            │ Login       │ │ Symptoms    │ │ Features     │
            │ Logout      │ │ Validate    │ │              │
            │             │ │ Patient     │ │ Call ML      │
            │             │ │ Data        │ │ Model        │
            └──────┬──────┘ └──────┬──────┘ └────────┬─────┘
                   │              │                  │
                   │              └──────────────────┤
                   │                                 │
                   ▼                                 ▼
            ┌────────────┐                    ┌──────────────┐
            │     D1     │                    │      D1      │
            │   Users    │                    │  Predictions │
            │   Table    │                    │   Table      │
            └────────────┘                    └──────────────┘
                                                     │
                                                     ▼
                                              ┌─────────────┐
                                              │  ML Models  │
                                              │  (model.pkl)│
                                              │  (vect.pkl) │
                                              │(encoders.pl)│
                                              └─────────────┘
```

### DFD Level 2: Detailed Process Flows

#### **P1: Authentication & User Management**

```
    USER
     │
     ├─→ "Register" Form
     │        │
     │        ▼
     │   ┌──────────────────┐
     │   │ P1.1: Validate   │
     │   │  Input Data      │
     │   │ (Name, Email,    │
     │   │  Password)       │
     │   └────────┬─────────┘
     │            │
     │     ┌──────┴──────┐
     │     │             │
     │     ▼ Valid       ▼ Invalid
     │ ┌────────┐     ┌──────────┐
     │ │P1.2:   │     │ Display  │
     │ │ Hash   │     │ Error    │
     │ │Pwd&    │     │Message   │
     │ │Store   │     └──────────┘
     │ │User    │
     │ │in DB   │
     │ └───┬────┘
     │     │
     │     ▼
     │  ┌─────────┐
     │  │   D1    │
     │  │  Users  │
     │  │ (Stored)│
     │  └─────────┘
     │
     ├─→ "Login" Form
     │        │
     │        ▼
     │   ┌──────────────────┐
     │   │ P1.3: Retrieve   │
     │   │ User by Email    │
     │   └────────┬─────────┘
     │            │
     │     ┌──────┴──────┐
     │     │             │
     │     ▼ Found       ▼ Not Found
     │ ┌────────┐     ┌──────────┐
     │ │P1.4:   │     │ Flash    │
     │ │Verify  │     │Error:    │
     │ │Hash    │     │Invalid   │
     │ │Pwd     │     │Email     │
     │ └───┬────┘     └──────────┘
     │     │
     │  ┌──┴──┐
     │  │     │
     │  ▼ OK  ▼ Fail
     │┌───────────┐ ┌──────────────┐
     ││ P1.5:Set  │ │Flash Error:  │
     ││Session    │ │Invalid Pwd   │
     ││(user_id)  │ └──────────────┘
     ││Redirect→  │
     ││Predict    │
     │└───────────┘
     │
     └─→ "Logout"
          │
          ▼
      ┌──────────────┐
      │ P1.6: Clear  │
      │ Session      │
      │ Redirect→    │
      │ Home         │
      └──────────────┘
```

#### **P2: Symptom Input & P3: Disease Prediction**

```
    USER (logged in)
         │
         ▼
    ┌──────────────────────────────┐
    │ /predict Route (GET)         │
    │ Display Prediction Form      │
    │ - Checkbox for 90+ symptoms  │
    │ - Age spinbox                │
    │ - Gender dropdown            │
    └──────────┬───────────────────┘
               │
               ▼
    ┌──────────────────────────────┐
    │ User Fills Form & Submits    │
    │ POST to /submit_prediction   │
    └──────────┬───────────────────┘
               │
               ▼
    ┌──────────────────────────────────┐      
    │ P2.1: Validate Input             │
    │ - Age: 1-100                     │
    │ - Gender: M/F/Other              │
    │ - Symptoms: ≥1 selected          │
    └──────────┬──────────────────────┘
               │
        ┌──────┴──────┐
        │             │
        ▼ Valid       ▼ Invalid
    ┌────────┐   ┌──────────────┐
    │ P2.2:  │   │ Flash Error  │
    │ Clean  │   │ Re-render    │
    │Symptom │   │Form          │
    │Text    │   └──────────────┘
    │        │
    │preproc │
    │ess.py │
    │        │
    │convert │
    │ to     │
    │comma   │
    │string  │
    └────┬───┘
         │
         ▼
    ┌──────────────────────────────┐
    │ P2.3: Build Feature Dict     │
    │ {                            │
    │   Age: int,                  │
    │   Gender: str (capitalized), │
    │   Symptoms: str,             │
    │   Symptom_Count: int         │
    │ }                            │
    └────┬──────────────────────────┘
         │
         ▼
    ┌──────────────────────────────────┐
    │ P3.1: Convert to DataFrame       │
    │ Single-row DataFrame for pipeline│
    └────┬───────────────────────────────┘
         │
         ▼
    ┌───────────────────────────────────────┐
    │ P3.2: Apply ML Pipeline              │
    │ ┌─────────────────────────────────┐  │
    │ │ ColumnTransformer               │  │
    │ │                                 │  │
    │ │ A) 'Symptoms' Column:           │  │
    │ │    TfidfVectorizer              │  │
    │ │     - max_features: 3000        │  │
    │ │     - ngram_range: (1, 2)       │  │
    │ │     → 3000-dim vector           │  │
    │ │                                 │  │
    │ │ B) 'Gender' Column:             │  │
    │ │    OneHotEncoder                │  │
    │ │     - M→[1,0,0]                 │  │
    │ │     - F→[0,1,0]                 │  │
    │ │     - O→[0,0,1]                 │  │
    │ │     → 3-dim vector              │  │
    │ │                                 │  │
    │ │ C) 'Age', 'Symptom_Count':      │  │
    │ │    Passthrough (as-is)          │  │
    │ │     → 2-dim vector              │  │
    │ │                                 │  │
    │ │ CONCATENATE → 3005-dim vector   │  │
    │ └─────────────────────────────────┘  │
    │              │                        │
    │              ▼                        │
    │ ┌──────────────────────────────────┐ │
    │ │ RandomForestClassifier           │ │
    │ │  - n_estimators: 200             │ │
    │ │  - Classes: 30 diseases          │ │
    │ │  - Output: class + probabilities │ │
    │ └──────────────────────────────────┘ │
    └───────────────┬──────────────────────┘
                    │
                    ▼
    ┌────────────────────────────────┐
    │ P3.3: Extract Results          │
    │                                │
    │ predicted_disease: str         │
    │ confidence: float (0-100%)     │
    │ all_probs: dict                │
    │  {disease: prob, ...}          │
    └────┬─────────────────────────────┘
         │
         ▼
    ┌──────────────────────────────────┐
    │ P4: Store Prediction in Database │
    │                                  │
    │ INSERT INTO predictions:         │
    │  user_id: int                    │
    │  age: int                        │
    │  gender: str                     │
    │  symptoms: str (comma-sep)       │
    │  predicted_disease: str          │
    │  confidence: float               │
    │  created_at: datetime            │
    └────┬──────────────────────────────┘
         │
         ▼
    ┌────────────┐
    │   D1.2     │
    │Predictions │
    │  (Stored)  │
    └────────────┘
         │
         ▼
    ┌──────────────────────────────┐
    │ P5: Render Result Page       │
    │ result.html                  │
    │ - Disease name               │
    │ - Confidence %               │
    │ - Patient info (age/gender)  │
    │ - Symptoms entered           │
    │ - Link to dashboard          │
    └──────────────────────────────┘
         │
         ▼
    USER (Browser Display)
```

#### **P4: View Dashboard & Prediction History**

```
    USER (logged in)
         │
         ▼
    ┌──────────────────────────┐
    │ Click "Dashboard"        │
    │ Route: /dashboard        │
    └──────────┬───────────────┘
               │
               ▼
    ┌────────────────────────────┐
    │ P4.1: Query Predictions    │
    │ FROM predictions           │
    │ WHERE user_id = session_id │
    │ ORDER BY created_at DESC   │
    └──────────┬─────────────────┘
               │
               ▼
    ┌────────────────────────────┐
    │ D1.2: Predictions Table    │
    │ (Retrieved from SQLite)    │
    └──────────┬─────────────────┘
               │
               ▼
    ┌────────────────────────────┐
    │ P4.2: Render Dashboard     │
    │ dashboard.html             │
    │                            │
    │ Display:                   │
    │ - Prediction count         │
    │ - Table of past diseases   │
    │ - Timestamps               │
    │ - Confidence scores        │
    │ - Delete option per record │
    │ - Export option            │
    └────────────────────────────┘
         │
         ▼
    USER (Browser Display)
```

---

## 🔄 Complete Request-Response Cycle

```
┌──────────────────────────────────────────────────────────────────────────┐
│                          USER REQUEST LIFECYCLE                          │
└──────────────────────────────────────────────────────────────────────────┘

1. HOME PAGE
   ┌─────────┐     ┌──────────┐     ┌──────────────┐
   │  GET /  │────→│  app.py  │────→│  home.html   │
   │ Browser │     │  home()  │     │   (Render)   │
   └─────────┘     └──────────┘     └──────────────┘

2. REGISTRATION
   ┌──────────────────┐     ┌─────────────────┐     ┌───────┐
   │ POST /register   │────→│ app.py          │────→│  D1   │
   │ {name, email,    │     │ register()      │     │ Users │
   │  password}       │     │ ✓ Validate      │     │ Table │
   └──────────────────┘     │ ✓ Hash pwd      │     └───────┘
                            │ ✓ Insert User   │
                            └─────────────────┘
                                   │
                                   ▼
                            ┌──────────────┐
                            │ Redirect to  │
                            │ /login       │
                            │ (Flash: "Reg │
                            │  Successful")│
                            └──────────────┘

3. LOGIN
   ┌──────────────────┐     ┌─────────────────┐     ┌───────┐
   │ POST /login      │────→│ app.py          │────→│  D1   │
   │ {email, pwd}     │     │ login()         │     │ Users │
   │                  │     │ ✓ Fetch user    │     │(Query)│
   │                  │     │ ✓ Verify hash   │     └───────┘
   └──────────────────┘     └────────┬────────┘
                                     │
                            ┌────────┴─────────┐
                            ▼                  ▼
                       ┌──────────┐      ┌──────────┐
                       │Set Session   │Display Error│
                       │user_id       │   (Flash)  │
                       │Redirect→     └──────────┘
                       │/predict
                       └──────────┘

4. PREDICTION (Symptom Input)
   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
   │ GET /predict │────→│ app.py       │────→│predict.html  │
   │              │     │predict()     │     │(Form with    │
   │(Logged in)   │     │(auth check)  │     │ checkboxes)  │
   └──────────────┘     └──────────────┘     └──────────────┘

5. PREDICTION (Submission & Processing)
   ┌───────────────────┐     ┌──────────────────────┐
   │POST /submit_      │────→│  app.py              │
   │prediction         │     │submit_prediction()   │
   │{age, gender,      │     │                      │
   │ symptoms: [list]} │     │1. ✓ Validate input  │
   │                   │     │2. ✓ Clean symptoms  │
   └───────────────────┘     │3. ✓ Build features  │
                             └──────────┬───────────┘
                                        │
                                        ▼
                             ┌──────────────────────┐
                             │  Load ML Artifacts   │
                             │  - model.pkl         │
                             │  - encoders.pkl      │
                             │  - vectorizer.pkl    │
                             └──────────┬───────────┘
                                        │
                                        ▼
                             ┌──────────────────────┐
                             │ Preprocess Features  │
                             │ - TF-IDF vectorize   │
                             │ - OneHot encode      │
                             │ - Normalize          │
                             └──────────┬───────────┘
                                        │
                                        ▼
                             ┌──────────────────────┐
                             │ Predict via Model    │
                             │ RandomForest.predict │
                             │ RandomForest.predict │
                             │_proba()              │
                             └──────────┬───────────┘
                                        │
                                        ▼
                             ┌──────────────────────┐
                             │ Extract Results      │
                             │ - disease (str)      │
                             │ - confidence (%)     │
                             │ - probabilities      │
                             └──────────┬───────────┘
                                        │
                                        ▼
                             ┌──────────────────────┐
                             │Store in Database     │
                             │INSERT predictions    │
                             │table with all data   │
                             └──────────┬───────────┘
                                        │
                    ┌───────────────────┼─────────────────┐
                    │                   │                 │
                    ▼                   ▼                 ▼
                ┌──────────┐      ┌───────┐      ┌──────────────┐
                │ D1.2     │      │ D1    │      │ Render       │
                │Prediction│      │ Users │      │result.html   │
                │ Stored   │      │       │      │              │
                └──────────┘      └───────┘      └──────────────┘
                                                         │
                                                         ▼
                                                   ┌──────────────┐
                                                   │ USER SEES:   │
                                                   │- Disease     │
                                                   │- Confidence  │
                                                   │- Entered     │
                                                   │  symptoms    │
                                                   │- Age/Gender  │
                                                   │- Timestamp   │
                                                   └──────────────┘

6. DASHBOARD (Prediction History)
   ┌────────────────┐     ┌──────────────┐     ┌──────────────┐
   │GET /dashboard  │────→│ app.py       │────→│  D1.2        │
   │                │     │dashboard()   │     │Predictions   │
   │(Logged in)     │     │(auth check)  │     │(Query for    │
   └────────────────┘     │✓ Query pred  │     │ user_id)     │
                          │ by user_id   │     └──────┬───────┘
                          └──────┬───────┘            │
                                 └──────────────────┬─┘
                                                    │
                                        ┌───────────┴──────────┐
                                        │                      │
                                        ▼                      ▼
                                   ┌──────────┐        ┌──────────────┐
                                   │ D1 Users │        │Render        │
                                   │(verify   │        │dashboard.html│
                                   │session)  │        │ - History    │
                                   └──────────┘        │ - Stats      │
                                                       │ - Export     │
                                                       └──────────────┘
                                                              │
                                                              ▼
                                                        USER SEES:
                                                        List of past
                                                        predictions

7. LOGOUT
   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
   │GET /logout   │────→│ app.py       │────→│Redirect to   │
   │              │     │logout()      │     │/home         │
   │              │     │✓ Clear sess. │     │(Flash: "Logged│
   └──────────────┘     └──────────────┘     │ out")        │
                                              └──────────────┘
```

---

## 🗄️ Data Stores

### **D1: SQLite Database (instance/app.db)**

#### **Users Table**
```
┌─────────────────────────────────────────────────────────┐
│ TABLE: users                                            │
├─────────────────────────────────────────────────────────┤
│ id (PK)          INT       PRIMARY KEY, AUTO INCREMENT  │
│ name             VARCHAR   NOT NULL                     │
│ email            VARCHAR   UNIQUE, NOT NULL             │
│ password         VARCHAR   HASHED (Werkzeug.security)   │
│ created_at       DATETIME  DEFAULT: utcnow()            │
├─────────────────────────────────────────────────────────┤
│ Relationship: 1 User → Many Predictions                │
└─────────────────────────────────────────────────────────┘

Example Row:
┌────┬──────────────┬─────────────────────────┬───────────┬─────────────────────┐
│ id │ name         │ email                   │ password  │ created_at          │
├────┼──────────────┼─────────────────────────┼───────────┼─────────────────────┤
│ 1  │ John Doe     │ john@example.com        │ $2b$12... │ 2025-02-24 10:30:00 │
│ 2  │ Jane Smith   │ jane@example.com        │ $2b$12... │ 2025-02-24 10:45:00 │
└────┴──────────────┴─────────────────────────┴───────────┴─────────────────────┘
```

#### **Predictions Table**
```
┌──────────────────────────────────────────────────────────────┐
│ TABLE: predictions                                           │
├──────────────────────────────────────────────────────────────┤
│ id (PK)              INT       PRIMARY KEY, AUTO INCREMENT   │
│ user_id (FK)         INT       FOREIGN KEY → users.id        │
│ age                  INT       Patient age (1-100)           │
│ gender               VARCHAR   Male/Female/Other             │
│ symptoms             TEXT      Comma-separated symptom list  │
│ predicted_disease    VARCHAR   One of 30 disease classes     │
│ confidence           FLOAT     Prediction confidence (0-1.0) │
│ created_at           DATETIME  DEFAULT: utcnow()            │
├──────────────────────────────────────────────────────────────┤
│ Index: (user_id, created_at DESC) for dashboard queries      │
└──────────────────────────────────────────────────────────────┘

Example Row:
┌────┬─────────┬─────┬────────┬──────────────────────────┬──────────────┬───────────┬─────────────────────┐
│ id │ user_id │ age │ gender │ symptoms                 │ pred_disease │ confid    │ created_at          │
├────┼─────────┼─────┼────────┼──────────────────────────┼──────────────┼───────────┼─────────────────────┤
│ 1  │    1    │ 45  │ Male   │ fever, cough, headache   │ Pneumonia    │ 0.847     │ 2025-02-24 11:20:15 │
│ 2  │    1    │ 32  │ Female │ rash, itching, redness   │ Skin Allergy │ 0.923     │ 2025-02-24 11:35:42 │
│ 3  │    2    │ 28  │ Male   │ fever, severe headache   │ Dengue Fever │ 0.756     │ 2025-02-24 11:50:08 │
└────┴─────────┴─────┴────────┴──────────────────────────┴──────────────┴───────────┴─────────────────────┘
```

### **D2: ML Model Files (ml/*.pkl)**

```
┌─────────────────────────────────────────────────────────┐
│ ML ARTIFACTS DIRECTORY: ml/                             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ☐ model.pkl                                           │
│    └─ Full sklearn Pipeline (ColumnTransformer +       │
│       RandomForestClassifier)                          │
│       • TF-IDF Vectorizer for symptom text             │
│       • OneHotEncoder for gender                       │
│       • 200-tree RandomForest classifier               │
│       • 30 disease classes                             │
│       • Trained on 25,000 synthetic samples            │
│                                                         │
│  ☐ vectorizer.pkl                                      │
│    └─ Extracted TF-IDF Vectorizer (reference copy)    │
│       • max_features: 3000                             │
│       • ngram_range: (1, 2)                            │
│       • lowercase: True, stop_words: 'english'         │
│                                                         │
│  ☐ encoders.pkl                                        │
│    └─ Dictionary of encoders                           │
│       {                                                │
│         'classes': [list of 30 disease names],         │
│         'label_encoder': LabelEncoder(diseases)        │
│       }                                                │
│                                                         │
│  ☐ dataset.csv (Training Data - Generated)            │
│    ├─ Patient_ID: string                              │
│    ├─ Age: int (1-100)                                │
│    ├─ Gender: str (Male/Female/Other)                 │
│    ├─ Symptoms: str (comma-separated)                 │
│    ├─ Symptom_Count: int (3-7 per record)             │
│    └─ Disease: str (target class)                     │
│       • 25,000 rows × 40+ diseases                     │
│       • Balanced distribution (≈833 per disease)       │
│       • 30 disease support                            │
│       • Synthetic but realistic symptom patterns       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 📈 Data Structures & Formats

### **Input: Symptom Submission**
```python
{
    "age": 45,                    # int, 1-100
    "gender": "Male",             # str, one of [Male, Female, Other]
    "symptoms": [                 # list of selected symptom strings
        "high fever",
        "chest pain",
        "shortness of breath",
        "fatigue",
        "sweating"
    ]
}
```

### **Processing: Feature Vector**
```python
Before Pipeline:
{
    "Age": 45,
    "Gender": "Male",
    "Symptoms": "high fever, chest pain, shortness of breath, fatigue, sweating",
    "Symptom_Count": 5
}

After Pipeline (3005-dimensional):
[TF-IDF features (3000-dim) | OneHot Gender (3-dim) | Age & SymptomCount (2-dim)]
```

### **Output: Prediction Result**
```python
{
    "predicted_disease": "Pneumonia",
    "confidence": 0.847,          # float, 0-1 (displayed as %)
    "all_probabilities": {        # dict of all 30 diseases
        "Common Cold": 0.012,
        "Influenza": 0.045,
        "Pneumonia": 0.847,       # highest
        "Tuberculosis": 0.021,
        ... (27 more)
    },
    "input_features": {           # for reference/debugging
        "age": 45,
        "gender": "Male",
        "symptom_count": 5,
        "symptoms_text": "high fever, chest pain, shortness of breath, fatigue, sweating"
    }
}
```

### **Database Record: Single Prediction**
```python
Prediction(
    user_id=1,
    age=45,
    gender="Male",
    symptoms="high fever, chest pain, shortness of breath, fatigue, sweating",
    predicted_disease="Pneumonia",
    confidence=84.7,              # stored as float 0-100
    created_at=datetime(2025, 2, 24, 11, 20, 15)
)
```

---

## 🔐 Security Features

| Feature | Implementation |
|---------|-----------------|
| **Password Hashing** | Werkzeug's `generate_password_hash()` / `check_password_hash()` (bcrypt) |
| **Session Management** | Flask session (server-side, secure cookies) |
| **CSRF Protection** | Flask WTF (implied in templates) |
| **SQL Injection Prevention** | SQLAlchemy ORM parameterized queries |
| **Input Validation** | Type checking, age range (1-100), gender enum |
| **Authentication Decorator** | `@login_required` wrapper for protected routes |
| **Error Messages** | Generic messages in production (no DB details leaked) |

---

## 📊 Supported Diseases (30 Classes)

**Respiratory Infections:**  
Common Cold, Influenza, Pneumonia, Tuberculosis, Bronchitis, COVID-19, Asthma

**Tropical & Infectious:**  
Dengue Fever, Malaria, Typhoid Fever

**Chronic Diseases:**  
Diabetes Mellitus, Hypertension, Heart Disease, Kidney Disease, Liver Disease, Anemia

**Neurological:**  
Stroke, Migraine, Epilepsy, Depression, Anxiety Disorder

**Endocrine:**  
Hypothyroidism, Hyperthyroidism

**Musculoskeletal:**  
Arthritis

**Acute Conditions:**  
Gastroenteritis, Appendicitis

**Infections & Skin:**  
Urinary Tract Infection, Skin Allergy, Conjunctivitis, Chickenpox

---

## 📁 File Summary

| File | Lines | Purpose |
|------|-------|---------|
| `app.py` | 309 | Main Flask application, all routes & logic |
| `database.py` | 55 | SQLAlchemy models (User, Prediction) |
| `ml/train_model.py` | 251 | Model training script & dataset generation |
| `ml/preprocess.py` | 101 | Shared preprocessing utilities |
| `requirements.txt` | 11 | Python dependencies |
| `templates/*.html` | ~600 | 6 Jinja2 templates (responsive UI) |
| `static/css/style.css` | ~300 | Medical-themed styling |
| `static/js/main.js` | ~100 | Client-side validation & UX |
| **Total** | **~1700** | Complete application |

---

## 🔄 Data Dictionary - All Symptoms

**Total available symptoms: 90+**

**Respiratory:** runny nose, sneezing, sore throat, cough, congestion, shortness of breath, wheezing, mucus production, persistent cough, dry cough, breathlessness, chest tightness, chest pain, chest discomfort...

**Systemic:** fever (mild, high, sustained, cyclical), fatigue, body aches, chills, sweating, night sweats, weakness, headache, severe headache, dizziness...

**GI:** nausea, vomiting, abdominal pain, loss of appetite, constipation, diarrhea, abdominal cramps, jaundice, dark urine...

**Sensory:** loss of taste, loss of smell, red eyes, eye discharge, tearing, light sensitivity, sound sensitivity, vision problems, blurred vision...

**Neurological:** confusion, trouble speaking, seizures, staring spells, uncontrollable movements, loss of consciousness, sudden numbness, palpitations...

**Joint/Muscle:** joint pain, muscle pain, muscle aches, muscle tension, stiffness, reduced range of motion, back pain, rash, blistering, hives, itching...

**Other:** blood in cough, weight loss, weight gain, hair loss, cold intolerance, heat intolerance, rapid heartbeat, slow healing, brittle nails, pale skin, cold hands, decreased urine, reduced range of motion, swelling, swollen legs, swollen eyelids, pelvic pain, burning urination, cloudy urine, rebound tenderness, nosebleed...

---

## 🎯 System Flow Summary

```
USER
  ↓
  ├─→ [Register] → Hash Password → Store User in DB
  │
  ├─→ [Login] → Verify Credentials → Create Session
  │
  ├─→ [Predict]
  │    ├─→ Input: Age, Gender, Symptoms (checkboxes)
  │    ├─→ Validate & Clean
  │    ├─→ Build DataFrame
  │    ├─→ Pass through ML Pipeline
  │    │    ├─→ TF-IDF vectorize symptoms (3000-dim)
  │    │    ├─→ OneHot encode gender (3-dim)
  │    │    ├─→ Passthrough age & symptom_count (2-dim)
  │    │    ├─→ Concatenate → 3005-dim feature vector
  │    │    └─→ RandomForest.predict_proba() → 30 class probabilities
  │    ├─→ Extract top predicted disease + confidence %
  │    ├─→ Store in Predictions table
  │    └─→ Display Result (disease, confidence, input)
  │
  ├─→ [Dashboard] → Query all user predictions (ordered by date) → Display history
  │
  └─→ [Logout] → Clear session → Redirect home
      
DATABASE (SQLite)
  ├─→ Users: id, name, email, password_hash, created_at
  └─→ Predictions: id, user_id, age, gender, symptoms, disease, confidence, created_at

ML MODELS
  ├─→ model.pkl: Full sklearn Pipeline
  ├─→ encoders.pkl: LabelEncoder for 30 diseases
  ├─→ vectorizer.pkl: TF-IDF vectorizer
  └─→ dataset.csv: Training data (25K samples)
```

---

## 📝 Summary

This is a **full-stack medical diagnosis support system** that:

✅ **Authenticates users** with secure password hashing  
✅ **Collects patient data** (age, gender, symptoms via multi-select)  
✅ **Preprocesses features** using TF-IDF, OneHot encoding, and feature scaling  
✅ **Predicts diseases** using a trained RandomForest classifier (30 classes)  
✅ **Stores predictions** in SQLite for audit trail and history  
✅ **Displays results** with confidence scores and detailed input summary  
✅ **Provides dashboard** for users to track their prediction history  
✅ **Maintains session security** with Flask sessions and login decorators  

**Technology highlights:**
- Scikit-learn ML pipeline for reproducible prediction
- SQLAlchemy ORM for database abstraction
- Werkzeug security for password hashing
- Jinja2 templating for dynamic HTML
- SQLite for lightweight, file-based persistence
