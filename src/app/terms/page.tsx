import LiabilitiesPageWrapper from "@/components/UI/LiabilitiesWrapper";
import Typography from "@/components/static/Typegraphy";

const TermsPage = () => {
  return (
    <LiabilitiesPageWrapper>
      <Typography type="heading" className="text-bold text-lg">
        Terms of Service
      </Typography>
      <Typography type="paragraph">
        Welcome to our serverless cloud application! These Terms of Service
        (&quot;Terms&quot;) govern your use of our application, including any
        services, features, or functionalities provided within the application.
        By accessing or using our application, you agree to comply with these
        Terms. If you do not agree with any part of these Terms, please refrain
        from using the application.
      </Typography>
      <Typography type="subheading">Use of the Application</Typography>
      <Typography type="paragraph">
        Our serverless cloud application is provided for informational and
        functional purposes only. You may use the application at your own risk,
        and we shall not be liable for any damages or harm that may arise from
        your use of the application. You are responsible for ensuring the
        security and confidentiality of your account credentials and any
        activities conducted through your account.
      </Typography>
      <Typography type="subheading" className="text-bold">
        Intellectual Property
      </Typography>
      <Typography type="paragraph">
        The contents of our application, including but not limited to text,
        graphics, images, logos, and software, are protected by intellectual
        property laws and are owned by us or our licensors. You are granted a
        limited, non-exclusive, non-transferable license to use the application
        for your personal or internal business purposes. You may not modify,
        reproduce, distribute, or create derivative works based on the
        application without our prior written consent.
      </Typography>
      <Typography type="subheading" className="text-bold">
        Disclaimer of Warranty and Liability
      </Typography>
      <Typography type="paragraph">
        Our application is provided on an &quot;as is&quot; and &quot;as
        available&quot; basis, without any warranties or representations,
        express or implied. We do not warrant the accuracy, completeness,
        reliability, or availability of the application. You acknowledge that
        the use of our application is at your own discretion and risk. We shall
        not be liable for any direct, indirect, incidental, consequential, or
        punitive damages arising out of or in connection with the use of our
        application.
      </Typography>
      <Typography type="subheading" className="text-bold">
        Termination
      </Typography>
      <Typography type="paragraph">
        We may terminate or suspend your access to the application at any time,
        with or without cause, and without prior notice or liability. Upon
        termination, all licenses and rights granted to you in these Terms will
        immediately cease.
      </Typography>
      <Typography type="subheading" className="text-bold">
        Governing Law and Jurisdiction
      </Typography>
      <Typography type="paragraph">
        These Terms shall be governed by and construed in accordance with the
        laws of the jurisdiction where the application is operated. Any legal
        action or proceeding arising out of or in connection with these Terms
        shall be brought exclusively in the courts of that jurisdiction.
      </Typography>
      <Typography type="subheading" className="text-bold">
        Changes to these Terms
      </Typography>
      <Typography type="paragraph">
        We reserve the right to modify or update these Terms at any time, and
        such modifications will be effective immediately upon posting. Your
        continued use of the application after any modifications to these Terms
        constitutes your acceptance of the modified Terms.
      </Typography>
      <Typography type="subheading" className="text-bold">
        Contact Us
      </Typography>
      <Typography type="paragraph">
        If you have any questions or concerns regarding these Terms or the
        application, please contact us at
        <Typography email="contact@bharathbandi.com" type="email">
          contact@bharathbandi.com.
        </Typography>
      </Typography>
      <Typography type="lightweight">
        These Terms of Service were last updated on Jun 3rd, 2023.
      </Typography>
    </LiabilitiesPageWrapper>
  );
};

export default TermsPage;
