<br />
<div align="center">
    <a href="https://github.com/code-jas/war-generator">
        <img
            src="https://github.com/code-jas/war-generator/blob/main/public/images/logo/android-chrome-512x512.png?raw=true"
            alt="Logo" width="80" height="80">
    </a>
    <h3 align="center">Weekly Achievement Report (WAR) Generator</h3>
    <p align="center">
        A comprehensive solution designed to automate the generation of weekly
        accomplishment reports based on Clockify data.
        <br /> <br />
        <!-- <a href="https://github.com/code-jas/war-generator">
            <strong>Explore the docs »</strong>
        </a> -->
        <!-- <br /> <br /> -->
        <!-- <a href="https://github.com/code-jas/war-generator">View Demo</a> -->
        <a
            href="https://github.com/code-jas/war-generator/issues/new?labels=bug&template=bug-report---.md">Report
            Bug</a> |
        <a
            href="https://github.com/code-jas/war-generator/issues/new?labels=enhancement&template=feature-request---.md">Request
            Feature</a>
    </p>
</div>

## About The Project

<div style="display: flex; justify-content: center; align-items: center; max-width: 1920px; margin: 0 auto;">
    <img src="https://github.com/code-jas/war-generator/blob/main/assets/screenshots/splashscreen.png?raw=true" alt="Product Screenshot" style="max-width: 100%; height: auto;">
</div>

The **Weekly Achievement Report (WAR) Generator** is a specialized tool created to streamline the process of generating weekly reports by automating data retrieval from the Clockify API and formatting it into a standardized Excel report. This application aims to reduce manual effort, minimize errors, and ensure consistency across all generated reports.

## Features

- **Google API Integration**: Seamlessly integrates with Google Drive API to automate the storage and management of generated reports.
- **Real-Time Email Sending**: Automatically sends generated reports to HR or other stakeholders instantly after creation.
- **Dynamic Components**: Utilizes dynamic UI components that adapt based on user input and data.
- **State Management**: Employs state management to maintain application state and ensure data consistency across components.
- **Error Handling and Notifications**: Implements robust error handling with real-time notifications to alert users of any issues during report generation or data retrieval.
- **Slack Webhook Integration**: (Planned) Will enable automatic sending of reports to designated Slack channels.

## Built With

This project was developed using the following technologies:

- [Nuxt 3](https://nuxt.com)
- [TypeScript](https://www.typescriptlang.org)
- [Pinia](https://pinia.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix Vue](https://www.radix-vue.com/overview/getting-started.html)
- [Clockify API Documentation](https://docs.clockify.me/)
- [Google Drive API Documentation](https://github.com/googleapis/google-api-nodejs-client?tab=readme-ov-file#readme)
- [Ant Design](https://ant.design)
- [Vercel](https://vercel.com/docs)

## Getting Started

To set up the WAR Generator locally, follow these steps:

### Prerequisites

Ensure you have npm installed:

```sh
npm install npm@latest -g
```

### Installation

1.  Clone the repository:

    ```sh
    git clone https://github.com/code-jas/war-generator.git
    ```

2.  Install the NPM packages:

    ```sh
    cd war-generator
    npm install
    ```

3.  Set up your environment variables:

    ```sh
    cp .env.example .env
    ```

    Replace the placeholder values in .env with your actual configuration.

4.  Run Development Server:

    ```sh
    npm run dev
    ```

<!-- ## Usage

The WAR Generator can be used to:

- Automate the generation of weekly reports from Clockify data.
- Customize report content and format as per the company’s requirements.
- Distribute reports via email, Google Drive, or Slack (upcoming feature).
- Preview reports in real-time before finalizing to ensure data accuracy. -->

<!-- _For more examples, please refer to the [Documentation](https://github.com/code-jas/war-generator/docs)_ -->

## Roadmap

- [x] Google API Integration
- [x] Real-Time Email Sending
- [x] Dynamic Components
- [x] State Management
- [x] Error Handling and Notifications
- [ ] Slack Webhook Integration

<!-- See the [open issues](https://github.com/code-jas/war-generator/issues) for a full list of proposed features (and known issues). -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this project better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## Contact

Email - johnangelo.silvestre04@gmail.com

Project Link: [https://github.com/code-jas/war-generator](https://github.com/code-jas/war-generator)

<!-- ## Acknowledgments

Special thanks to the following resources and communities for their support:

- [Nuxt.js Documentation](https://nuxt.com/)
- [Clockify API Documentation](https://docs.clockify.me/)
- [Google Drive API Documentation](https://github.com/googleapis/google-api-nodejs-client?tab=readme-ov-file#readme)
- [Radix Vue](https://www.radix-vue.com/overview/getting-started.html)
- [Pinia](https://pinia.vuejs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel](https://vercel.com/docs) -->
