import { Box, CssBaseline, Button, Container, Typography } from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDrawer from "./templates/PrimaryDrawer";
import SecondaryDrawer from "./templates/SecondaryDrawer";
import PopularChannels from "../components/PrimaryDrawer/PopularChannels";
import ExploreCategories from "../components/SecondaryDrawer/ExploreCategories";
import MainSection from "./templates/MainSection";
import CreateServerButton from "../components/Main/CreateServerButton";
export default function Homepage() {
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
          <CreateServerButton />
        </MainSection>
      </Box>
    </>
  );
}
