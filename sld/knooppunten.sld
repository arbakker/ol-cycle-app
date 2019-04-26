<?xml version="1.0" encoding="ISO-8859-1" standalone="yes"?>
<!--
  ~ This program is free software: you can redistribute it and/or modify
  ~ it under the terms of the GNU General Public License as published by
  ~ the Free Software Foundation, either version 3 of the License, or
  ~ (at your option) any later version.
  ~
  ~ This program is distributed in the hope that it will be useful,
  ~ but WITHOUT ANY WARRANTY; without even the implied warranty of
  ~ MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  ~ GNU General Public License for more details.
  ~
  ~ You should have received a copy of the GNU General Public License
  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.
  -->

<sld:StyledLayerDescriptor version="1.0.0" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink">
  <sld:NamedLayer>
    <sld:Name>fietsknooppunten</sld:Name>
    <sld:UserStyle>
      <sld:Name>Style1</sld:Name>
      <sld:FeatureTypeStyle>
        <!--<sld:FeatureTypeName>fietsknooppunten</sld:FeatureTypeName>-->
        <sld:Rule>
          <sld:Name>fietsknooppunten</sld:Name>
          <sld:Title>fietsknooppunten</sld:Title>
          <sld:MaxScaleDenominator>270000</sld:MaxScaleDenominator>
          <sld:PointSymbolizer>
            <sld:Graphic>
              <sld:Mark>
                <sld:WellKnownName>circle</sld:WellKnownName>
                <sld:Fill>
                  <sld:CssParameter name="fill">#19C800</sld:CssParameter>
                  <sld:CssParameter name="fill-opacity">1.0</sld:CssParameter>
                </sld:Fill>
              </sld:Mark>
              <sld:Size>4</sld:Size>
              <sld:Rotation>0</sld:Rotation>
            </sld:Graphic>
          </sld:PointSymbolizer>
          <sld:TextSymbolizer>
            <sld:Label>
              <ogc:PropertyName>knooppuntn</ogc:PropertyName>
            </sld:Label>
            <sld:Font>
              <sld:CssParameter name="font-family">Arial</sld:CssParameter>
              <sld:CssParameter name="font-family">SansSerif</sld:CssParameter>
              <sld:CssParameter name="font-size">9</sld:CssParameter>
              <sld:CssParameter name="font-style">normal</sld:CssParameter>
              <sld:CssParameter name="font-weight">normal</sld:CssParameter>
            </sld:Font>
            <sld:LabelPlacement>
              <sld:PointPlacement>
                <sld:AnchorPoint>
                  <sld:AnchorPointX>0.75</sld:AnchorPointX>
                  <sld:AnchorPointY>0.75</sld:AnchorPointY>
                </sld:AnchorPoint>
              </sld:PointPlacement>
            </sld:LabelPlacement>
            <sld:Halo>
              <sld:Radius>3</sld:Radius>
              <sld:Fill>
                <sld:CssParameter name="fill">#FFFFFF</sld:CssParameter>
                <sld:CssParameter name="fill-opacity">1.0</sld:CssParameter>
              </sld:Fill>
            </sld:Halo>
            <sld:Fill>
              <sld:CssParameter name="fill">#19C800</sld:CssParameter>
              <sld:CssParameter name="fill-opacity">1.0</sld:CssParameter>
            </sld:Fill>
          </sld:TextSymbolizer>
        </sld:Rule>
      </sld:FeatureTypeStyle>
    </sld:UserStyle>
  </sld:NamedLayer>
</sld:StyledLayerDescriptor>
