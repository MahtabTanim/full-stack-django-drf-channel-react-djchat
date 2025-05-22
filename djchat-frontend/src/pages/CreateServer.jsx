import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDrawer from "./templates/PrimaryDrawer";
import SecondaryDrawer from "./templates/SecondaryDrawer";
import PopularChannels from "../components/PrimaryDrawer/PopularChannels";
import ExploreCategories from "../components/SecondaryDrawer/ExploreCategories";
import MainSection from "./templates/MainSection";
import CreateServerForm from "../components/Main/CreateServerForm";
export default function CreateServer() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <PrimaryAppBar />
        <PrimaryDrawer>
          <PopularChannels />
        </PrimaryDrawer>
        <SecondaryDrawer>
          <ExploreCategories />
        </SecondaryDrawer>
        <MainSection>
          <CreateServerForm />
        </MainSection>
      </Box>
    </>
  );
}
