import LiabilitiesPageWrapper from "@/components/UI/LiabilitiesWrapper";
import Typography from "@/components/UI/Typography";

const PrivacyPolicyPage = () => {
  return (
    <LiabilitiesPageWrapper>
      <Typography type="heading" className="text-bold text-lg">
        Privacy Policy
      </Typography>
      <Typography type="paragraph">
        Welcome to our application! This Privacy Policy explains how we collect,
        use, and protect your information when you use our serverless cloud
        application. We are committed to maintaining the privacy and security of
        your data. Please read this policy carefully to understand how we handle
        your information. If you have any questions or concerns, feel free to
        reach out to us at
        <Typography email="contact@bharathbandi.com" type="email">
          contact@bharathbandi.com.
        </Typography>
      </Typography>
      <Typography type="subheading">Information We Collect</Typography>
      <Typography type="paragraph">
        When you interact with our application, we automatically collect certain
        information about your device and usage. This information may include
        details such as your web browser, IP address, time zone, and cookies
        installed on your device. We refer to this information as &quot;Device
        Information.&quot; We collect Device Information using various
        technologies, including cookies and log files. Cookies are data files
        that are placed on your device and may include an anonymous unique
        identifier. Log files track actions occurring on the application, such
        as your IP address, browser type, Internet service provider,
        referring/exit pages, and date/time stamps.
      </Typography>
      <Typography type="paragraph">
        In addition to Device Information, when you upload an image to our
        application, we collect the image itself. We use this image to provide
        our services, such as image optimization and processing. It&apos;s
        important to note that we only retain the image for a limited period,
        specifically 24 hours, after which it is automatically deleted from our
        servers.
      </Typography>
      <Typography type="subheading" className="text-bold">
        How We Use Your Information
      </Typography>
      <Typography type="paragraph">
        We use the images you upload to our application solely for the purpose
        of providing our services to you. This includes image optimization,
        processing, and any other functionalities related to the application. We
        do not use your images for any other purpose without your explicit
        consent.
      </Typography>
      <Typography type="paragraph">
        To provide our services, we may utilize third-party services or
        algorithms. These entities are required to have sufficient technical and
        organizational measures in place to ensure the security and privacy of
        your data. We do not share your user data, including images, with any
        third parties unless required by law or with your explicit consent.
      </Typography>
      <Typography type="subheading" className="text-bold">
        How We Protect Your Information
      </Typography>
      <Typography type="paragraph">
        The security of your information is of utmost importance to us. We have
        implemented strict measures to safeguard your data from unauthorized
        access, use, or disclosure. All images uploaded to our servers are
        securely stored in{" "}
        <Typography type="special">AWS Simple Storage Service</Typography> using
        encryption and access controls. We employ industry-standard practices to
        protect your information and regularly monitor our systems for potential
        vulnerabilities.
      </Typography>
      <Typography type="subheading" className="text-bold">
        Use of Cookies
      </Typography>
      <Typography type="paragraph">
        We do not use cookies to track user behavior on our application.
        However, we may utilize session cookies to manage your session while
        using our website. These session cookies are temporary and are deleted
        once you close your browser.
      </Typography>
      <Typography type="subheading" className="text-bold">
        Changes to Our Privacy Policy
      </Typography>
      <Typography type="paragraph">
        We reserve the right to update or modify this Privacy Policy at any
        time. Any changes made to the policy will be posted on this page, and
        the revised date will be indicated at the top. We encourage you to
        review this policy periodically to stay informed about how we protect
        your information.
      </Typography>
      <Typography type="subheading" className="text-bold">
        Contact Us
      </Typography>
      <Typography type="paragraph">
        If you have any questions or concerns regarding this Privacy Policy or
        our data practices, please don&apos;t hesitate to reach out to us at
        <Typography email="contact@bharathbandi.com" type="email">
          contact@bharathbandi.com.
        </Typography>
        We are here to address any queries you may have.
      </Typography>
      <Typography type="paragraph">
        Thank you for trusting us with your data and using our serverless cloud
        application!
      </Typography>
    </LiabilitiesPageWrapper>
  );
};

export default PrivacyPolicyPage;
